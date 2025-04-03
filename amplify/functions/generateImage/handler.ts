import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/generateImage";

export const handler: Schema["generateImage"]["functionHandler"] = async (
  event
) => {
  const client = new BedrockRuntimeClient({ region: env.REGION });
  const res = await client.send(
    new InvokeModelCommand({
      modelId: env.MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        taskType: "TEXT_IMAGE",
        textToImageParams: {
          text: event.arguments.prompt,
        },
        imageGenerationConfig: {
          cfgScale: 10,
          seed: 0,
          quality: "standard",
          height: 512,
          width: 512,
          numberOfImages: 1,
        },
      }),
    })
       
    
  );

  const jsonString = new TextDecoder().decode(res.body);
  const output = JSON.parse(jsonString);

  return output.images;
};
