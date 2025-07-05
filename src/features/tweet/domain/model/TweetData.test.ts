import { describe, it, expect } from 'vitest'
import { addTweet, deleteTweet, updateInputValue, type TweetData } from './TweetData'
import { type Tweet } from './Tweet'

describe('TweetData', () => {
  const mockTweet1: Tweet = {
    id: '1',
    content: 'First tweet'
  }

  const mockTweet2: Tweet = {
    id: '2',
    content: 'Second tweet'
  }

  const initialTweetData: TweetData = {
    inputValue: '',
    errorMessage: '',
    tweets: []
  }

  describe('addTweet', () => {
    it('should add a tweet to empty tweets array', () => {
      const result = addTweet(initialTweetData, mockTweet1)
      
      expect(result.tweets).toHaveLength(1)
      expect(result.tweets[0]).toEqual(mockTweet1)
      expect(result.inputValue).toBe('')
      expect(result.errorMessage).toBe('')
    })

    it('should add a tweet to existing tweets array', () => {
      const dataWithTweet: TweetData = {
        inputValue: 'some input',
        errorMessage: 'some error',
        tweets: [mockTweet1]
      }
      
      const result = addTweet(dataWithTweet, mockTweet2)
      
      expect(result.tweets).toHaveLength(2)
      expect(result.tweets[0]).toEqual(mockTweet1)
      expect(result.tweets[1]).toEqual(mockTweet2)
      expect(result.inputValue).toBe('')
      expect(result.errorMessage).toBe('')
    })

    it('should clear input value and error message when adding tweet', () => {
      const dataWithInput: TweetData = {
        inputValue: 'some input text',
        errorMessage: 'validation error',
        tweets: []
      }
      
      const result = addTweet(dataWithInput, mockTweet1)
      
      expect(result.inputValue).toBe('')
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([mockTweet1])
    })

    it('should not mutate original data', () => {
      const originalData = { ...initialTweetData }
      const result = addTweet(initialTweetData, mockTweet1)
      
      expect(initialTweetData).toEqual(originalData)
      expect(result).not.toBe(initialTweetData)
    })
  })

  describe('deleteTweet', () => {
    it('should delete tweet by id', () => {
      const dataWithTweets: TweetData = {
        inputValue: 'input',
        errorMessage: 'error',
        tweets: [mockTweet1, mockTweet2]
      }
      
      const result = deleteTweet(dataWithTweets, '1')
      
      expect(result.tweets).toHaveLength(1)
      expect(result.tweets[0]).toEqual(mockTweet2)
      expect(result.inputValue).toBe('input')
      expect(result.errorMessage).toBe('error')
    })

    it('should return unchanged data when tweet id not found', () => {
      const dataWithTweets: TweetData = {
        inputValue: 'input',
        errorMessage: 'error',
        tweets: [mockTweet1, mockTweet2]
      }
      
      const result = deleteTweet(dataWithTweets, 'nonexistent')
      
      expect(result.tweets).toHaveLength(2)
      expect(result.tweets).toEqual([mockTweet1, mockTweet2])
      expect(result.inputValue).toBe('input')
      expect(result.errorMessage).toBe('error')
    })

    it('should handle empty tweets array', () => {
      const result = deleteTweet(initialTweetData, '1')
      
      expect(result.tweets).toHaveLength(0)
      expect(result).toEqual(initialTweetData)
    })

    it('should delete all tweets with same id', () => {
      const duplicateIdTweet: Tweet = {
        id: '1',
        content: 'Different content but same id'
      }
      
      const dataWithDuplicateIds: TweetData = {
        inputValue: '',
        errorMessage: '',
        tweets: [mockTweet1, duplicateIdTweet, mockTweet2]
      }
      
      const result = deleteTweet(dataWithDuplicateIds, '1')
      
      expect(result.tweets).toHaveLength(1)
      expect(result.tweets[0]).toEqual(mockTweet2)
    })

    it('should not mutate original data', () => {
      const originalData: TweetData = {
        inputValue: 'input',
        errorMessage: 'error',
        tweets: [mockTweet1, mockTweet2]
      }
      const originalDataCopy = JSON.parse(JSON.stringify(originalData))
      
      const result = deleteTweet(originalData, '1')
      
      expect(originalData).toEqual(originalDataCopy)
      expect(result).not.toBe(originalData)
    })
  })

  describe('updateInputValue', () => {
    it('should update input value with valid content', () => {
      const validContent = 'Hello world'
      const result = updateInputValue(initialTweetData, validContent)
      
      expect(result.inputValue).toBe(validContent)
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([])
    })

    it('should set error message for empty content', () => {
      const result = updateInputValue(initialTweetData, '')
      
      expect(result.inputValue).toBe('')
      expect(result.errorMessage).toBe('Tweet something')
      expect(result.tweets).toEqual([])
    })

    it('should set error message for content exceeding 140 characters', () => {
      const longContent = 'a'.repeat(141)
      const result = updateInputValue(initialTweetData, longContent)
      
      expect(result.inputValue).toBe(longContent)
      expect(result.errorMessage).toBe('Tweet until 140 chars')
      expect(result.tweets).toEqual([])
    })

    it('should clear error message when content becomes valid', () => {
      const dataWithError: TweetData = {
        inputValue: 'a'.repeat(141),
        errorMessage: 'Tweet until 140 chars',
        tweets: []
      }
      
      const result = updateInputValue(dataWithError, 'Valid content')
      
      expect(result.inputValue).toBe('Valid content')
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([])
    })

    it('should preserve tweets array when updating input', () => {
      const dataWithTweets: TweetData = {
        inputValue: 'old input',
        errorMessage: '',
        tweets: [mockTweet1, mockTweet2]
      }
      
      const result = updateInputValue(dataWithTweets, 'new input')
      
      expect(result.inputValue).toBe('new input')
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([mockTweet1, mockTweet2])
    })

    it('should handle content with exactly 140 characters', () => {
      const exactContent = 'a'.repeat(140)
      const result = updateInputValue(initialTweetData, exactContent)
      
      expect(result.inputValue).toBe(exactContent)
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([])
    })

    it('should handle special characters in input', () => {
      const specialContent = 'Hello 世界! 🌍 #test @user'
      const result = updateInputValue(initialTweetData, specialContent)
      
      expect(result.inputValue).toBe(specialContent)
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([])
    })

    it('should handle whitespace-only content as valid', () => {
      const whitespaceContent = '   '
      const result = updateInputValue(initialTweetData, whitespaceContent)
      
      expect(result.inputValue).toBe(whitespaceContent)
      expect(result.errorMessage).toBe('')
      expect(result.tweets).toEqual([])
    })

    it('should not mutate original data', () => {
      const originalData = { ...initialTweetData }
      const result = updateInputValue(initialTweetData, 'new input')
      
      expect(initialTweetData).toEqual(originalData)
      expect(result).not.toBe(initialTweetData)
    })
  })
})