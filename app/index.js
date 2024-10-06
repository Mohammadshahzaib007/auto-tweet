import dotEnv from "dotenv";
dotEnv.config();

import fs from "fs";
import path from "path";
import { twitterClient } from "./twitter-client.js";

const tweetsPath = path.join("app/", "tweets.json");
let tweets = await JSON.parse(fs.readFileSync(tweetsPath, "utf8")); // Assuming tweets.json contains an array of tweets

const postTweet = async (tweet) => {
  try {
    await twitterClient.v2.tweet(tweet);
    return `Tweet posted: ${tweet}`;
  } catch (error) {
    throw error;
  }
};

const postDailyTweets = async () => {
  try {
    let tweet = tweets.shift(); // Get the next tweet from the list
    if (tweet) {
      const response = await postTweet(tweet); // Post the tweet
      // Save the remaining tweets to the file after posting
      console.log(response);
      fs.writeFileSync(tweetsPath, JSON.stringify(tweets, null, 2));
    } else {
      console.log("No more tweets to post.");
    }
  } catch (error) {
    console.error("Error posting tweets:", error);
  }
};

postDailyTweets();
