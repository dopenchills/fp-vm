import type { Result } from "../../../../shared/Result"
import type { TweetApiEnv } from "../env/env"
import type { TweetData } from "../model/Tweets"

export const load = async (env: TweetApiEnv): Promise<Result<TweetData>> => {
  const tweetsResult = await env.getTweets()
  
  return tweetsResult.map(tweets => ({
    tweets,
    inputValue: '',
    errorMessage: '',
  }))
}
