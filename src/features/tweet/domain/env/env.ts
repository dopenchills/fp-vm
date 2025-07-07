import type { DomainError } from "src/shared/error/model/DomainError";
import type { Result } from "../../../../shared/Result";
import type { Tweet } from "../model/Tweet";

export type GetTweets = () => Promise<Result<Tweet[], DomainError>>
export type PostTweet = (tweet: Tweet) => Promise<Result<Tweet, DomainError>>
export type DeleteTweet = (id: string) => Promise<Result<void, DomainError>>

export type TweetApiEnv = {
  getTweets: GetTweets
  postTweet: PostTweet
  deleteTweet: DeleteTweet
}