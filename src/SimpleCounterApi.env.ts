import { getCountA, loadA, postCountA } from "./SimpleCounterApi.A"
import type { GetCount, Load, PostCount } from "./SimpleCounterApi.type"

type SimpleCounterApiEnv = {
  load: Load
  getCount: GetCount
  postCount: PostCount
}

export const simpleCounterApiEnv: SimpleCounterApiEnv = {
  load: loadA,
  getCount: getCountA,
  postCount: postCountA
}
