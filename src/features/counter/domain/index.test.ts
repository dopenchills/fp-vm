import { describe, it, expect } from 'vitest'
import { increment, decrement, undo, type SimpleCounterData } from './index'

describe('Counter Domain', () => {
  const initialData: SimpleCounterData = {
    count: 0,
    history: []
  }

  describe('increment', () => {
    it('should increment count from 0 to 1', () => {
      const result = increment(initialData)
      
      expect(result.count).toBe(1)
      expect(result.history).toHaveLength(1)
      expect(result.history[0]).toEqual({
        count: 1,
        command: '+'
      })
    })

    it('should increment count from existing value', () => {
      const data: SimpleCounterData = {
        count: 5,
        history: [{ count: 5, command: '+' }]
      }
      const result = increment(data)
      
      expect(result.count).toBe(6)
      expect(result.history).toHaveLength(2)
      expect(result.history[1]).toEqual({
        count: 6,
        command: '+'
      })
    })

    it('should preserve existing history', () => {
      const data: SimpleCounterData = {
        count: 3,
        history: [
          { count: 1, command: '+' },
          { count: 2, command: '+' },
          { count: 3, command: '+' }
        ]
      }
      const result = increment(data)
      
      expect(result.history).toHaveLength(4)
      expect(result.history.slice(0, 3)).toEqual(data.history)
    })
  })

  describe('decrement', () => {
    it('should decrement count from 0 to -1', () => {
      const result = decrement(initialData)
      
      expect(result.count).toBe(-1)
      expect(result.history).toHaveLength(1)
      expect(result.history[0]).toEqual({
        count: -1,
        command: '-'
      })
    })

    it('should decrement count from existing value', () => {
      const data: SimpleCounterData = {
        count: 5,
        history: [{ count: 5, command: '+' }]
      }
      const result = decrement(data)
      
      expect(result.count).toBe(4)
      expect(result.history).toHaveLength(2)
      expect(result.history[1]).toEqual({
        count: 4,
        command: '-'
      })
    })

    it('should preserve existing history', () => {
      const data: SimpleCounterData = {
        count: 3,
        history: [
          { count: 1, command: '+' },
          { count: 2, command: '+' },
          { count: 3, command: '+' }
        ]
      }
      const result = decrement(data)
      
      expect(result.history).toHaveLength(4)
      expect(result.history.slice(0, 3)).toEqual(data.history)
    })
  })

  describe('undo', () => {
    it('should return same data when history is empty', () => {
      const result = undo(initialData)
      
      expect(result).toEqual(initialData)
    })

    it('should undo increment operation', () => {
      const data: SimpleCounterData = {
        count: 1,
        history: [{ count: 1, command: '+' }]
      }
      const result = undo(data)
      
      expect(result.count).toBe(0)
      expect(result.history).toHaveLength(0)
    })

    it('should undo decrement operation', () => {
      const data: SimpleCounterData = {
        count: -1,
        history: [{ count: -1, command: '-' }]
      }
      const result = undo(data)
      
      expect(result.count).toBe(0)
      expect(result.history).toHaveLength(0)
    })

    it('should undo only the last operation', () => {
      const data: SimpleCounterData = {
        count: 3,
        history: [
          { count: 1, command: '+' },
          { count: 2, command: '+' },
          { count: 3, command: '+' }
        ]
      }
      const result = undo(data)
      
      expect(result.count).toBe(2)
      expect(result.history).toHaveLength(2)
      expect(result.history).toEqual([
        { count: 1, command: '+' },
        { count: 2, command: '+' }
      ])
    })

    it('should correctly undo mixed operations', () => {
      const data: SimpleCounterData = {
        count: 0,
        history: [
          { count: 1, command: '+' },
          { count: 0, command: '-' }
        ]
      }
      const result = undo(data)
      
      expect(result.count).toBe(1)
      expect(result.history).toHaveLength(1)
      expect(result.history[0]).toEqual({ count: 1, command: '+' })
    })
  })
})