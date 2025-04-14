import { defineFunction } from "@aws-amplify/backend";


export const AGENT_ID = "NRZCOEQP33";
export const REGION = "us-west-2";

export const tripplanner = defineFunction({
  name: "tripplanner",
  entry: "./handler.ts",
  environment: {
    AGENT_ID,
    REGION,
  },
  timeoutSeconds: 500,
});
