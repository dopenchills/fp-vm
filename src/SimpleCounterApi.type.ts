import type { Result } from "./Result";
import type { Count, SimpleCounterData } from "./SimpleCounter";

export type GetCount = () => Promise<Result<Count>>
export type PostCount = (count: Count) => Promise<Result<Count>>
export type Load = () => Promise<Result<SimpleCounterData>>
