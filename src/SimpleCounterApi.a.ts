import { type Result, ok } from "./Result"
import type { Count, SimpleCounterData } from "./SimpleCounter"
import type { GetCount, Load, PostCount } from "./SimpleCounterApi.type"

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

export const loadA: Load = async (): Promise<Result<SimpleCounterData>> => {
  const countResult = await getCountA()

  if (!countResult.ok) {
    throw countResult.error
  }

  return ok({
    count: countResult.value,
    history: []
  })
}
