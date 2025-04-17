import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand
} from "@aws-sdk/client-bedrock-agent-runtime";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import type { Schema } from "../../data/resource";

const AGENT_ID = "HMZSCMERPN";
const AGENT_ALIAS_ID = "SDZYRHCISE";
const REGION = "us-west-2";
const TABLE_NAME = "tripplanner_results";

const bedrockClient = new BedrockAgentRuntimeClient({ region: REGION });
const dynamoClient = new DynamoDBClient({ region: REGION });

export const handler: Schema["tripplanner"]["functionHandler"] = async (event) => {
  const inputText = String(event.arguments.prompt);
  const sessionId = "session-001"; // You can also randomize this if needed

  const input = {
    agentId: AGENT_ID,
    agentAliasId: AGENT_ALIAS_ID,
    sessionId,
    inputText,
    enableTrace: true,
  };

  console.log("Input:", input);

  try {
    const command = new InvokeAgentCommand(input);
    const response = await bedrockClient.send(command);

    let resultText = "";

    if (response.completion) {
      for await (const event of response.completion) {
        if (event.chunk?.bytes) {
          resultText += new TextDecoder().decode(event.chunk.bytes);
        }
      }
    } else {
      resultText = "No completion response from the agent.";
    }

    // Save to DynamoDB
    const putCommand = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        id: { S: `${Date.now()}-${Math.floor(Math.random() * 1000)}` },
        prompt: { S: inputText },
        response: { S: resultText },
        timestamp: { N: `${Date.now()}` },
      },
    });

    await dynamoClient.send(putCommand);

    return {
      resultText
    };
  } catch (error) {
    console.error("Error invoking agent or writing to DynamoDB:", error);

    return {
      resultText: "An error occurred while processing your request."
    };
  }
};
