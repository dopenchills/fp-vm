import { validationError, type ValidationError } from "src/shared/error/model/DomainError"
import { err, ok, type Result } from "src/shared/Result"

export type Tweet = {
  id: string
  content: string
}

const maxLength = 140

export const tweet = (value: { content: string }): Result<Tweet, ValidationError[]> => {
  if (value.content.trim().length === 0) {
    return err([validationError('content', 'Tweet something')])
  }

  if (value.content.length > maxLength) {
    return err([validationError('content', 'Tweet until 140 chars')])
  }

  return ok({
    ...value, 
    id: Math.random().toString()
  })
}
