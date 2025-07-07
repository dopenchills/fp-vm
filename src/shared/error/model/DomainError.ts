export const DomainErrorNameMap = {
  ValidationError: 'ValidationError',
  NotFoundError: 'NotFoundError',
  UnexpectedError: 'UnexpectedError'
} as const

export type ValidationError = {
  type: typeof DomainErrorNameMap.ValidationError
  field: string
  message: string
}

export const validationError = (field: string, message: string): ValidationError => {
  return {
    type: DomainErrorNameMap.ValidationError,
    field,
    message
  }
}

export type NotFoundError = {
  type: typeof DomainErrorNameMap.NotFoundError
}

export const notFoundError = (): NotFoundError => {
  return {
    type: DomainErrorNameMap.NotFoundError,
  }
}

export type UnexpectedError = {
  type: typeof DomainErrorNameMap.UnexpectedError
  message: string
}

export const unexpectedError = (message: string): UnexpectedError => {
  return {
    type: DomainErrorNameMap.UnexpectedError,
    message
  }
}

export type DomainError = 
  | ValidationError
  | NotFoundError
  | UnexpectedError
