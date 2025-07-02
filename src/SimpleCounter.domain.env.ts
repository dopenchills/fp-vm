import type { Result } from "./Result";
import type { Count, SimpleCounterData } from "./SimpleCounter.domain";

export type GetCount = () => Promise<Result<Count>>
export type PostCount = (count: Count) => Promise<Result<Count>>
export type Load = () => Promise<Result<SimpleCounterData>>

export type SimpleCounterApiEnv = {
  load: Load
  getCount: GetCount
  postCount: PostCount
}
