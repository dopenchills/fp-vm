import type { Result } from "../../../shared/Result";
import type { DomainError } from "../../../shared/error/model/DomainError";
import type { Count } from ".";

export type GetCount = () => Promise<Result<Count, DomainError>>
export type PostCount = (count: Count) => Promise<Result<Count, DomainError>>

export type SimpleCounterApiEnv = {
  getCount: GetCount
  postCount: PostCount
}
