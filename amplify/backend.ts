import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data, conversationHandler, crossRegionModel, model  } from "./data/resource";
import { generateImage, MODEL_ID } from "./functions/generateImage/resource";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { storage, knowledgeBaseBucket } from "./storage/resource";
import { getNews } from "./functions/getNews/resource";
import { readKnowledgebase } from "./functions/readKnowledgebase/resource";


const KB_REGION = "us-west-2";

// Replace with your own Knowledge Base ID
// https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html
const KB_ID = "FNNLUSTD05";

const backend = defineBackend({
  auth,
  data,
  generateImage,
  storage,
  getNews,
  readKnowledgebase,
  knowledgeBaseBucket,
  conversationHandler
});

backend.generateImage.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: [`arn:aws:bedrock:*::foundation-model/${MODEL_ID}`],
  })
);

backend.readKnowledgebase.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:Retrieve"],
    resources: [`*`],
  })
);


//support cross region
backend.conversationHandler.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    resources: [
      `arn:aws:bedrock:us-west-2:703671928942:inference-profile/${crossRegionModel}`,
      `arn:aws:bedrock:us-west-2::foundation-model/${model}`,
      `arn:aws:bedrock:us-east-1::foundation-model/${model}`,
      `arn:aws:bedrock:us-east-2::foundation-model/${model}`,
    ],
    actions: [
      'bedrock:InvokeModel',
      'bedrock:InvokeModelWithResponseStream'
    ],
  })
);

//const KnowledgeBaseDataSource =   
//  backend.data.resources.graphqlApi.addHttpDataSource(
//    "KnowledgeBaseDataSource",
//    `https://bedrock-agent-runtime.${KB_REGION}.amazonaws.com`,
//    {
//      authorizationConfig: {
//        signingRegion: KB_REGION,
//        signingServiceName: "bedrock",
//      },
//    }
//  );

//KnowledgeBaseDataSource.grantPrincipal.addToPrincipalPolicy(
//  new PolicyStatement({
//    resources: [`arn:aws:bedrock:${KB_REGION}:*:knowledge-base/${KB_ID}`],
//    actions: ["bedrock:Retrieve"],
//  })
//);
