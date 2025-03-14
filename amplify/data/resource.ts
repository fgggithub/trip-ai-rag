import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { generateImage } from "../functions/generateImage/resource";
import { getNews } from "../functions/getNews/resource";
import { readKnowledgebase } from "../functions/readKnowledgebase/resource";
console.log("resource.ts")

import { defineConversationHandlerFunction } from "@aws-amplify/backend-ai/conversation";


export const model = 'anthropic.claude-3-5-sonnet-20241022-v2:0';
export const crossRegionModel = `us.${model}`;

export const conversationHandler = defineConversationHandlerFunction({
  entry: "./conversationHandler.ts",
  name: "conversationHandler",
  models: [{ modelId: crossRegionModel }],
});






const schema = a.schema({
  Story: a
    .model({
      title: a.string().required(),
      story: a.string().required(),
    })
    .authorization((allow) => [allow.authenticated()]),
  chat: a
    .conversation({
      aiModel: {
          resourcePath: crossRegionModel,
      },
      systemPrompt:
        "You are an an expert at creating travel plans. You will assist " +
        "the user in creating a travel experience that matches the story string, " +
        "title string or id.",

      tools: [
        a.ai.dataTool({
          name: "listStories",
          description:
            "This lists all stories from the Story model. " +
            "Use it to find stories with the story field " +
            "and display them to user.",
          model: a.ref("Story"),
          modelOperation: "list",
        }),
        a.ai.dataTool({
          name: "getNews",
          description:
            "Help generate a story prompt using " +
            "the current news.  User will provide a category",
          query: a.ref("getNews"),
        }),
        a.ai.dataTool({
          name: "readKnowledgebase",
          description:
            "Help generate a story prompt using " +
            "when user asks about an existing story",
          query: a.ref("readKnowledgebase"),
        }),
      ],
    })
    .authorization((allow) => allow.owner()),
  summarizer: a
    .generation({
      aiModel: { resourcePath: crossRegionModel,
      },
      systemPrompt:
        "You are a helpful assistant that summarizes stories. " +
        "Give a concise summary of the supplied story. " +
        "The summary should be one or two sentences long",
      inferenceConfiguration: {
        temperature: 0.7,
        topP: 1,
        maxTokens: 400,
      },
    })
    .arguments({
      story: a.string(),
    })
    .returns(
      a.customType({
        summary: a.string(),
      })
    )
    .authorization((allow) => [allow.authenticated()]),
  generateStory: a
    .generation({
      aiModel: { resourcePath: crossRegionModel,
      },
      systemPrompt:
        "Generate a travel itinerary and a title that's fun and exciting, " +
        "The story should be a short and be in the form of an " +
        "travel itinerary with suggested acivities based on input. The title should be interesting and " +
        "short.",
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        story: a.string().required(),
        title: a.string().required(),
      })
    )
    .authorization((allow) => allow.authenticated()),
  generateImage: a
    .query()
    .arguments({
      prompt: a.string(),
    })
    .returns(a.string().array())
    .handler(a.handler.function(generateImage))
    .authorization((allow) => [allow.authenticated()]),
  getNews: a
    .query()
    .arguments({
      category: a.string(),
    })
    .returns(
      a.customType({
        title: a.string(),
        description: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated())
    .handler(a.handler.function(getNews)),
  //knowledgeBase: a
  //  .query()
  //  .arguments({ input: a.string() })
  //  .handler(
  //    a.handler.custom({
  //      dataSource: "KnowledgeBaseDataSource",
  //      entry: "./kbResolver.js",
  //    })
   // )
   // .returns(a.string())
   // .authorization((allow) => [allow.authenticated()]),
  readKnowledgebase: a
    .query()
    .arguments({
       prompt: a.string(),
    })
    .returns(
      a.customType({
        resultText: a.string()
      })
    )
    .handler(a.handler.function(readKnowledgebase))
    .authorization((allow) => [allow.authenticated()]),
});
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});