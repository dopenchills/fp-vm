import { ok, type Result } from "../../../shared/Result"
import type { SimpleCounterData } from "."
import type { SimpleCounterApiEnv } from "./env"

export const load = async (env: SimpleCounterApiEnv): Promise<Result<SimpleCounterData>> => {
  const countResult = await env.getCount()

  if (!countResult.ok) {
    throw countResult.error
  }

  return ok({
    count: countResult.value,
    history: []
  })
}
