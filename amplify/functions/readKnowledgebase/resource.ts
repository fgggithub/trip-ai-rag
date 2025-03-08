import { defineFunction } from "@aws-amplify/backend";

export const KB_ID = "WGM61WNU6K";
export const REGION = "us-west-2";

export const readKnowledgebase = defineFunction({
  name: "readKnowledgebase",
  entry: "./handler.ts",
  environment: {
    KB_ID,
    REGION,
  },
  timeoutSeconds: 500,
});
