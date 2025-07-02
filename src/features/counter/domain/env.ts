import type { Result } from "../../../shared/Result";
import type { Count } from ".";

export type GetCount = () => Promise<Result<Count>>
export type PostCount = (count: Count) => Promise<Result<Count>>

export type SimpleCounterApiEnv = {
  getCount: GetCount
  postCount: PostCount
}
