export type Result<T, E = Error> = 
| {
    ok: true,
    value: T
    map<U>(fn: (value: T) => U): Result<U, E>
  }
| {
    ok: false
    error: E
    map<U>(fn: (value: T) => U): Result<U, E>
  }

export const ok = <T, E = Error>(value: T): Result<T, E> => ({ 
  ok: true, 
  value,
  map<U>(fn: (value: T) => U): Result<U, E> {
    return ok<U, E>(fn(value))
  }
})

export const err = <T, E = Error>(error: E): Result<T, E> => ({ 
  ok: false, 
  error,
  map<U>(_fn: (value: T) => U): Result<U, E> {
    return err<U, E>(error)
  }
})

