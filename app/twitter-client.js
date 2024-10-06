import dotEnv from "dotenv";
dotEnv.config();

import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN_KEY,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);
export const twitterClient = client.readWrite;
export const twitterBearer = bearer.readOnly;
