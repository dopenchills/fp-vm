import type { SimpleCounterApiEnv } from "./SimpleCounter.domain.env"
import { getCountA, postCountA } from "./SimpleCounter.infra.api.a"

export const simpleCounterApiEnv: SimpleCounterApiEnv = {
  getCount: getCountA,
  postCount: postCountA
}
