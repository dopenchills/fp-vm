import { type Result, err, ok } from "../../../shared/Result"
import type { Tweet } from "../domain/model/Tweet"
import type { GetTweets, PostTweet, DeleteTweet } from "../domain/env/env"
import { notFoundError, type DomainError } from "src/shared/error/model/DomainError"

const STORAGE_KEY = 'fp-vm-tweets'

const getTweetsFromStorage = (): Tweet[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveTweetsToStorage = (tweets: Tweet[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets))
}

export const getTweets: GetTweets = (): Promise<Result<Tweet[], DomainError>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const tweets = getTweetsFromStorage()
      resolve(ok(tweets))
    }, 500)
  })
}

export const postTweet: PostTweet = (tweet: Tweet): Promise<Result<Tweet, DomainError>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const existingTweets = getTweetsFromStorage()
      const newTweets = [tweet, ...existingTweets]
      saveTweetsToStorage(newTweets)
      resolve(ok(tweet))
    }, 500)
  })
}

export const deleteTweet: DeleteTweet = (id: string): Promise<Result<void, DomainError>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const existingTweets = getTweetsFromStorage()
      if (!existingTweets.find(tweet => tweet.id === id)) {
        resolve(err(notFoundError()))
      }
      const newTweets = existingTweets.filter(tweet => tweet.id !== id)
      saveTweetsToStorage(newTweets)
      resolve(ok(undefined))
    }, 500)
  })
}
