import { type Result, ok } from "../../../shared/Result"
import type { DomainError } from "../../../shared/error/model/DomainError"
import type { Count } from "../domain"
import type { GetCount, PostCount } from "../domain/env"

let _count: Count = 0
export const getCountA: GetCount = (): Promise<Result<Count, DomainError>> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ok(_count))
    }, 1_000)
  })
}

export const postCountA: PostCount = (count: Count): Promise<Result<Count, DomainError>> => {
  _count = count

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ok(count))
    }, 1_000)
  })
}
