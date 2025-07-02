import { type Result, ok } from "../../../shared/Result"
import type { Count } from "../domain"
import type { GetCount, PostCount } from "../domain/env"

let _count: Count = 0
export const getCountA: GetCount = (): Promise<Result<Count>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ok(_count))
    }, 3_000)
  })
}

export const postCountA: PostCount = (count: Count): Promise<Result<Count>> => {
  _count = count

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ok(count))
    }, 3_000)
  })
}
