export type Result<T, E = Error> = 
| {
    ok: true,
    value: T
    map<U>(fn: (value: T) => U): Result<U, E>
    match<U>(handlers: { ok: (value: T) => U, err: (error: E) => U }): U
  }
| {
    ok: false
    error: E
    map<U>(fn: (value: T) => U): Result<U, E>
    match<U>(handlers: { ok: (value: T) => U, err: (error: E) => U }): U
  }

export const ok = <T, E = Error>(value: T): Result<T, E> => ({ 
  ok: true, 
  value,
  map<U>(fn: (value: T) => U): Result<U, E> {
    return ok<U, E>(fn(value))
  },
  match<U>(handlers: { ok: (value: T) => U, err: (error: E) => U }): U {
    return handlers.ok(value)
  }
})

export const err = <T, E = Error>(error: E): Result<T, E> => ({ 
  ok: false, 
  error,
  map<U>(_fn: (value: T) => U): Result<U, E> {
    return err<U, E>(error)
  },
  match<U>(handlers: { ok: (value: T) => U, err: (error: E) => U }): U {
    return handlers.err(error)
  }
})

