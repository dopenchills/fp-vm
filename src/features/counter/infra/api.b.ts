import { type Result, ok } from "../../../shared/Result"
import type { Count } from "../domain"
import type { GetCount, PostCount } from "../domain/env"

const STORAGE_KEY = 'fp-vm-counter'

const getCountFromStorage = (): Count => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? parseInt(stored, 10) : 0
}

const saveCountToStorage = (count: Count): void => {
  localStorage.setItem(STORAGE_KEY, count.toString())
}

export const getCountB: GetCount = (): Promise<Result<Count>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const count = getCountFromStorage()
      resolve(ok(count))
    }, 1_000)
  })
}

export const postCountB: PostCount = (count: Count): Promise<Result<Count>> => {
  saveCountToStorage(count)

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ok(count))
    }, 1_000)
  })
}
