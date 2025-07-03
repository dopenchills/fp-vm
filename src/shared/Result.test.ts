import { describe, it, expect } from 'vitest'
import { ok, err } from './Result'

describe('Result', () => {
  describe('ok', () => {
    it('should create a successful result', () => {
      const result = ok(42)
      
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(42)
      }
    })

    it('should handle string values', () => {
      const result = ok('success')
      
      expect(result.ok).toBe(true)
      if (result.ok) { expect(result.value).toBe('success') }
    })

    it('should handle object values', () => {
      const data = { id: 1, name: 'test' }
      const result = ok(data)
      
      expect(result.ok).toBe(true)
      if (result.ok) { expect(result.value).toEqual(data) }
    })
  })

  describe('err', () => {
    it('should create an error result', () => {
      const error = new Error('Something went wrong')
      const result = err(error)
      
      expect(result.ok).toBe(false)
      if (!result.ok) { expect(result.error).toBe(error) }
    })

    it('should handle string errors', () => {
      const result = err('Failed to load')
      
      expect(result.ok).toBe(false)
      if (!result.ok) { expect(result.error).toBe('Failed to load') }
    })

    it('should handle custom error types', () => {
      const customError = { code: 404, message: 'Not found' }
      const result = err(customError)
      
      expect(result.ok).toBe(false)
      if (!result.ok) { expect(result.error).toEqual(customError) }
    })
  })

  describe('map', () => {
    it('should transform successful result value', () => {
      const result = ok(10)
      const mapped = result.map(x => x * 2)
      
      expect(mapped.ok).toBe(true)
      if (mapped.ok) { expect(mapped.value).toBe(20) }
    })

    it('should transform to different type', () => {
      const result = ok(42)
      const mapped = result.map(x => `Number: ${x}`)
      
      expect(mapped.ok).toBe(true)
      if (mapped.ok) { expect(mapped.value).toBe('Number: 42') }
    })

    it('should not transform error result', () => {
      const error = new Error('Failed')
      const result = err<number>(error)
      const mapped = result.map(x => x * 2)
      
      expect(mapped.ok).toBe(false)
      if (!mapped.ok) { expect(mapped.error).toBe(error) }
    })

    it('should chain map operations on successful result', () => {
      const result = ok(5)
        .map(x => x * 2)
        .map(x => x + 1)
        .map(x => `Result: ${x}`)
      
      expect(result.ok).toBe(true)
      if (result.ok) { expect(result.value).toBe('Result: 11') }
    })

    it('should stop chaining on first error', () => {
      const error = new Error('Failed')
      const errorResult = err<number>(error)
      const mapped = errorResult
        .map(x => x * 2)
        .map(x => x + 1)
      
      expect(mapped.ok).toBe(false)
      if (!mapped.ok) { expect(mapped.error).toBe(error) }
    })
  })

  describe('match', () => {
    it('should call ok handler for successful result', () => {
      const result = ok(42)
      const output = result.match({
        ok: value => `Success: ${value}`,
        err: error => `Error: ${error}`
      })
      
      expect(output).toBe('Success: 42')
    })

    it('should call err handler for error result', () => {
      const error = new Error('Something failed')
      const result = err<number>(error)
      const output = result.match({
        ok: value => `Success: ${value}`,
        err: error => `Error: ${error.message}`
      })
      
      expect(output).toBe('Error: Something failed')
    })
  })
})
