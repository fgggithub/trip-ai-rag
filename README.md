# Amplify AI Example: Trip Planner - Based on original code for Story Teller With Claude and Amazon Bedrock Knowledge Base

This is a Vite React application that displays trip Itinerarries (stories in the original code) . It also has a chat interface to query external APIs, including Amazon Bedrock Knowledge Base (Accomplished through Lambda call).

This example uses:

- Amplify Gen2
- React Router
- shadcn/ui
- Tailwind

## Getting Started

### Prerequisites

- Node.js 18+ installed
- AWS account that has been set up for AWS Amplify and has access to the Claude models in Amazon Bedrock
- If you like to test the News API chat, you'll need to sign up for a [News API](https://newsapi.org) account. You'll then need to add the NEWS_API_KEY as a [secret](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/secrets-and-vars/).

### Installation

1. Clone the repository and `cd` into the `trip-ai-rag` directory
2. Install the dependencies with your favorite Javscript package manager. For example, `npm install`
3. (optional) Add the News API key `npx ampx sandbox secret set NEWS_API_KEY`
4. Setup Amazon Bedrock Knowledge Base. Enter your KB_ID and KB_REGION in the `amplify/backend.ts` file and update the `amplify/data/kbResolver.js` file with the correct `resourcePath` with the KB_ID.
5. Run `npx ampx sandbox` to spin up a sandbox cloud backend
6. Run `npm run dev` to start up the Vite React app locally.

To deploy to Amplify (Only needed if you want to share the URL etc.): 
I found the process to be a bit confusing but basically you need to have Amplify "see" your repository.  The following is how I deploy V2 apps like this.

Im AWS Amplify console 
1) select Create new app.
2) Select GitHub
3) Select a repository. (I think the first time and for any new repository you have to select Update GitHun permissions)  It took a few screen refreshes for me to get my repository to show up.
4) Select you branch.  (Likely main) 
5) You code should be deployed.  If you get errors you will need to debug your code.  

NOTE!!! This app will create some Lambda deployments as well as cognito deployments.  I found that it enabled unauthenticated access so go into your cognito user pools and disable this.  You also might want to disable any self registration. 
