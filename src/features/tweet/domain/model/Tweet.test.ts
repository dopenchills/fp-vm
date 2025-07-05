import { describe, it, expect } from 'vitest'
import { tweet, type Tweet } from './Tweet'

describe('Tweet', () => {
  describe('tweet function', () => {
    it('should create a tweet with valid content', () => {
      const content = 'Hello world'
      const result = tweet({ content })
      
      expect(result.ok).toBe(true)
      
      if (result.ok) {
        expect(result.value.content).toBe(content)
        expect(result.value.id).toBeDefined()
        expect(typeof result.value.id).toBe('string')
      }
    })

    it('should return error for empty content', () => {
      const result = tweet({ content: '' })
      
      expect(result.ok).toBe(false)
      
      if (!result.ok) {
        expect(result.error).toBe('Tweet something')
      }
    })

    it('should return error for content exceeding 140 characters', () => {
      const longContent = 'a'.repeat(141)
      const result = tweet({ content: longContent })
      
      expect(result.ok).toBe(false)
      
      if (!result.ok) {
        expect(result.error).toBe('Tweet until 140 chars')
      }
    })

    it('should accept content with exactly 140 characters', () => {
      const exactContent = 'a'.repeat(140)
      const result = tweet({ content: exactContent })
      
      expect(result.ok).toBe(true)
      
      if (result.ok) {
        expect(result.value.content).toBe(exactContent)
        expect(result.value.content.length).toBe(140)
      }
    })

    it('should accept content with 1 character', () => {
      const result = tweet({ content: 'a' })
      
      expect(result.ok).toBe(true)
      
      if (result.ok) {
        expect(result.value.content).toBe('a')
      }
    })

    it('should generate different IDs for different tweets', () => {
      const result1 = tweet({ content: 'First tweet' })
      const result2 = tweet({ content: 'Second tweet' })
      
      expect(result1.ok).toBe(true)
      expect(result2.ok).toBe(true)
      
      if (result1.ok && result2.ok) {
        expect(result1.value.id).not.toBe(result2.value.id)
      }
    })

    it('should handle special characters in content', () => {
      const content = 'Hello 世界! 🌍 #test @user'
      const result = tweet({ content })
      
      expect(result.ok).toBe(true)
      
      if (result.ok) {
        expect(result.value.content).toBe(content)
      }
    })

    it('should handle whitespace-only content as invalid', () => {
      const content = '   '
      const result = tweet({ content })
      
      expect(result.ok).toBe(false)
      
      if (!result.ok) {
        expect(result.error).toBe('Tweet something')
      }
    })

    it('should handle newlines and tabs in content', () => {
      const content = 'Line 1\nLine 2\tTabbed'
      const result = tweet({ content })
      
      expect(result.ok).toBe(true)
      
      if (result.ok) {
        expect(result.value.content).toBe(content)
      }
    })
  })
})