import type { DomainError } from "src/shared/error/model/DomainError"
import type { Result } from "../../../../shared/Result"
import type { TweetApiEnv } from "../env/env"
import type { TweetData } from "../model/TweetData"

export const load = async (env: TweetApiEnv): Promise<Result<TweetData, DomainError>> => {
  const tweetsResult = await env.getTweets()
  
  return tweetsResult.map(tweets => ({
    tweets,
    inputValue: '',
    errorMessage: '',
  }))
}
