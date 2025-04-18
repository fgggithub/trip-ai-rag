
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand
} from "@aws-sdk/client-bedrock-agent-runtime";
import type { Schema } from "../../data/resource";
//import { env } from "$amplify/env/tripplanner";
const AGENT_ID = "HMZSCMERPN";
const AGENT_ALIAS_ID = "SDZYRHCISE";
const REGION = "us-west-2";

export const handler: Schema["tripplanner"]["functionHandler"] = async (event) => {
  const inputText = String(event.arguments.prompt);

  const client = new BedrockAgentRuntimeClient({ region: "us-west-2" });

  const input = {
    agentId: AGENT_ID,
    agentAliasId: AGENT_ALIAS_ID,
    sessionId: "session-001",
    inputText,
    enableTrace: true
  };
  console.log("input", input);
  try {
    const command = new InvokeAgentCommand(input);
    const response = await client.send(command);

    let resultText = "";
    console.log("input", response);
    if (response.completion) {
      for await (const event of response.completion) {
        if (event.chunk?.bytes) {
          resultText += new TextDecoder().decode(event.chunk.bytes);
        }
        console.log("result text", resultText);
      }
    } else {
      resultText = "No completion response from the agent.";
    }

    return {
      resultText
    };
  } catch (error) {
    console.error("Error invoking agent:", error);

    return {
      resultText: "An error occurred while invoking the agent."
    };
  }
};