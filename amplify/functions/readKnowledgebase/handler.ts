
import {RetrieveCommand, BedrockAgentRuntimeClient} from "@aws-sdk/client-bedrock-agent-runtime"
import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/readKnowledgebase"


export const handler: Schema["readKnowledgebase"]["functionHandler"] = async (event) => {
  // Initialize the BedrockRuntimeClient with the region (use the appropriate region for your service)
  const query_text = "tell me about Johnanthon the magician"
  console.log("event",query_text)
  const client = new BedrockAgentRuntimeClient({ region: "us-west-2" }); // Adjust region as needed
  const input = { // RetrieveRequest
    knowledgeBaseId: env.KB_ID, // required
    retrievalQuery: { // KnowledgeBaseQuery
     text: query_text,
    },
    retrievalConfiguration: { // KnowledgeBaseRetrievalConfiguration
      vectorSearchConfiguration: { // KnowledgeBaseVectorSearchConfiguration
        numberOfResults: Number(1),
      },
    },
  };
  
  console.log("before try", input)

  try {
  
    const command = new RetrieveCommand(input);
    const result = "no result"
    console.log("beforecommand", command)
    const res = await client.send(command);
    console.log("after res", res)
    if (res.retrievalResults && res.retrievalResults.length > 0) {
      // Assuming the retrievalResults contain objects with text and location
      const resultText = res.retrievalResults.map((result) => {
        return `Text: ${result.content?.text}, Location: ${result.location?.s3Location?.uri}`;
      }).join("\n");

    // Check if response body exists and decode it
    return {
     resultText
    };
  } else {
    const resultText = "No results found in the knowledge base.";
    console.log("resultText", resultText)
    return {
      //statusCode: 404,
       
    };
  }

} catch (error) {
  const resultText = "No results found in the knowledge base.";
  console.log("error", resultText)
  console.log("error response", error)

  // Return error response
  return {
    resultText
  };
}
};
