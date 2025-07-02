export type Result<T, E = Error> = 
| {
    ok: true,
    value: T
  }
| {
    ok: false
    error: E
  }

export const ok = <T, E = Error>(value: T): Result<T, E> => ({ ok: true, value })
export const err = <T, E = Error>(error: E): Result<T, E> => ({ ok: false, error })

export const map = <T, U, E>(
  fn: (value: T) => U,
  result: Result<T, E>
): Result<U, E> => {
  if (result.ok) {
    return ok<U, E>(fn(result.value))
  }
  return result
}
