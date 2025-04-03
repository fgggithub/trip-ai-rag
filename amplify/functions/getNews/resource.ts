import { defineFunction, secret } from "@aws-amplify/backend";

export const getNews = defineFunction({
  name: "getNews",
  entry: "./handler.ts",
  environment: {
    NEWS_API_KEY: secret("news_api_key"),
  },
  timeoutSeconds: 500,
});
