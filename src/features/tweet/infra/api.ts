import { type Result, ok } from "../../../shared/Result"
import type { Tweet } from "../domain/model/Tweet"
import type { GetTweets, PostTweet, DeleteTweet } from "../domain/env/env"

const STORAGE_KEY = 'fp-vm-tweets'

const getTweetsFromStorage = (): Tweet[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveTweetsToStorage = (tweets: Tweet[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets))
}

export const getTweets: GetTweets = (): Promise<Result<Tweet[]>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const tweets = getTweetsFromStorage()
      resolve(ok(tweets))
    }, 500)
  })
}

export const postTweet: PostTweet = (tweet: Tweet): Promise<Result<Tweet>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const existingTweets = getTweetsFromStorage()
      const newTweets = [tweet, ...existingTweets]
      saveTweetsToStorage(newTweets)
      resolve(ok(tweet))
    }, 500)
  })
}

export const deleteTweet: DeleteTweet = (id: string): Promise<Result<void>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const existingTweets = getTweetsFromStorage()
      const newTweets = existingTweets.filter(tweet => tweet.id !== id)
      saveTweetsToStorage(newTweets)
      resolve(ok(undefined))
    }, 500)
  })
}