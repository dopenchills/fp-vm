import type { SimpleCounterApiEnv } from "./SimpleCounter.domain.env"
import { getCountA, loadA, postCountA } from "./SimpleCounter.infra.api.a"

export const simpleCounterApiEnv: SimpleCounterApiEnv = {
  load: loadA,
  getCount: getCountA,
  postCount: postCountA
}
