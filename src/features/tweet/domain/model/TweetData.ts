import { tweet, type Tweet } from "./Tweet"

export type TweetData = {
  inputValue: string
  errorMessage: string
  tweets: Tweet[]
}

export const addTweet = (data: TweetData, newTweet: Tweet): TweetData => ({
  inputValue: '',
  errorMessage: '',
  tweets: [...data.tweets, newTweet]
})

export const updateInputValue = (data: TweetData, inputValue: string): TweetData => ({
  ...data,
  inputValue,
  errorMessage: tweet({ content: inputValue }).match({
    ok: () => '',
    err: (validationErrors) => validationErrors.at(0)?.message ?? ''
  })
})

export const deleteTweet = (data: TweetData, id: string): TweetData => ({
  ...data,
  tweets: data.tweets.filter(tweet => tweet.id !== id)
})
