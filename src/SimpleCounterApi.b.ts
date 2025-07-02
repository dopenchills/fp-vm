import { ok, type Result } from "./Result";
import type { Count } from "./SimpleCounter";
import type { GetCount } from "./SimpleCounterApi.type";

export const getCountB: GetCount = async (): Promise<Result<Count>> => {
  return ok(1)
}
