import { ok, type Result } from "./Result"
import type { SimpleCounterData } from "./SimpleCounter.domain"
import type { SimpleCounterApiEnv } from "./SimpleCounter.domain.env"

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
