import type { SimpleCounterApiEnv } from "../domain/env"
import { getCountA, postCountA } from "./api.a"
import { getCountB, postCountB } from "./api.b"

const simpleCounterApiAEnv: SimpleCounterApiEnv = {
  getCount: getCountA,
  postCount: postCountA
}

const simpleCounterApiBEnv: SimpleCounterApiEnv = {
  getCount: getCountB,
  postCount: postCountB
}

// TODO: change SimpleCounterApiEnv depending on process.env
export const simpleCounterApiEnv: SimpleCounterApiEnv = simpleCounterApiBEnv
