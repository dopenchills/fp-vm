import type { SimpleCounterApiEnv } from "./SimpleCounter.domain.env"
import { getCountA, postCountA } from "./SimpleCounter.infra.api.a"
import { getCountB, postCountB } from "./SimpleCounter.infra.api.b"

const simpleCounterApiAEnv: SimpleCounterApiEnv = {
  getCount: getCountA,
  postCount: postCountA
}

const simpleCounterApiBEnv: SimpleCounterApiEnv = {
  getCount: getCountB,
  postCount: postCountB
}

// TODO: change SimpleCounterApiEnv depending on process.env
export const simpleCounterApiEnv: SimpleCounterApiEnv = simpleCounterApiAEnv
