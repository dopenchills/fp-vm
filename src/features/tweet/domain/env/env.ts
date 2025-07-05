import type { Result } from "../../../../shared/Result";
import type { Tweet } from "../model/Tweet";

export type GetTweets = () => Promise<Result<Tweet[]>>
export type PostTweet = (tweet: Tweet) => Promise<Result<Tweet>>
export type DeleteTweet = (id: string) => Promise<Result<void>>

export type TweetApiEnv = {
  getTweets: GetTweets
  postTweet: PostTweet
  deleteTweet: DeleteTweet
}