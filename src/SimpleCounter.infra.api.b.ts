import { ok, type Result } from "./Result";
import type { Count } from "./SimpleCounter.domain";
import type { GetCount } from "./SimpleCounter.domain.env";

export const getCountB: GetCount = async (): Promise<Result<Count>> => {
  return ok(1)
}
