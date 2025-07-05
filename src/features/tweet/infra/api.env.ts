import type { TweetApiEnv } from "../domain/env/env"
import { getTweets, postTweet, deleteTweet } from "./api"

export const tweetApiEnv: TweetApiEnv = {
  getTweets,
  postTweet,
  deleteTweet
}