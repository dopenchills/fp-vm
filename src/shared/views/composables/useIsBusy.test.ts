import { describe, it, expect, vi } from 'vitest'
import { useBusy } from './useIsBusy'

describe('useBusy', () => {
  it('should initialize with isBusy as false', () => {
    const { isBusy } = useBusy()
    
    expect(isBusy.value).toBe(false)
  })

  it('should return reactive isBusy ref', () => {
    const { isBusy } = useBusy()
    
    expect(isBusy).toBeDefined()
    expect(typeof isBusy.value).toBe('boolean')
  })

  it('should set isBusy to true during async operation', async () => {
    const { isBusy, withBusy } = useBusy()
    
    const mockProcess = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    )
    
    const promise = withBusy(mockProcess)
    
    expect(isBusy.value).toBe(true)
    
    await promise
    
    expect(isBusy.value).toBe(false)
    expect(mockProcess).toHaveBeenCalledOnce()
  })

  it('should handle successful async operations', async () => {
    const { isBusy, withBusy } = useBusy()
    
    const mockProcess = vi.fn().mockResolvedValue('success')
    
    await withBusy(mockProcess)
    
    expect(isBusy.value).toBe(false)
    expect(mockProcess).toHaveBeenCalledOnce()
  })

  it('should handle failed async operations', async () => {
    const { isBusy, withBusy } = useBusy()
    
    const mockProcess = vi.fn().mockRejectedValue(new Error('Failed'))
    
    try {
      await withBusy(mockProcess)
    } catch (error) {
      expect((error as Error).message).toBe('Failed')
    }
    
    expect(isBusy.value).toBe(false)
    expect(mockProcess).toHaveBeenCalledOnce()
  })

  it('should reset isBusy to false even if process throws error', async () => {
    const { isBusy, withBusy } = useBusy()
    
    const mockProcess = vi.fn().mockImplementation(() => {
      throw new Error('Synchronous error')
    })
    
    try {
      await withBusy(mockProcess)
    } catch (error) {
      expect((error as Error).message).toBe('Synchronous error')
    }
    
    expect(isBusy.value).toBe(false)
    expect(mockProcess).toHaveBeenCalledOnce()
  })
})