import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/getNews";

const URL = "https://newsapi.org/v2/everything?q=";

export const handler: Schema["getNews"]["functionHandler"] = async (event) => {
  //const res = await fetch(
  //  `${URL}${encodeURIComponent(event.arguments.category ?? "")}&apiKey=${
  //    env.NEWS_API_KEY
  //  }`
  //);

  const res = await fetch(
    `${URL}${encodeURIComponent(event.arguments.category ?? "")}&apiKey='a148e525ae6d4da4bddccf1a8a810154'`
  );
  console.log("event", event);

  const json = await res.json();
  console.log("json", json);
  

  const newsItem = json.articles[0];

  return {
    title: newsItem.title,
    description: newsItem.description,
  };
};
