import { DomainErrorNameMap, type DomainError } from "../model/DomainError"
import { buttonActionClose, errorActionDialog, type ErrorAction } from "./ErrorAction"

type ErrorHandler = (error: DomainError) => ErrorAction | undefined

const notFoundErrorHandler: ErrorHandler = (error) => {
  if (error.type !== DomainErrorNameMap.NotFoundError) {
    return
  }

  return errorActionDialog('Not found', [buttonActionClose()])
}

const unexpectedErrorHandler: ErrorHandler = (error) => {
  if (error.type !== DomainErrorNameMap.UnexpectedError) {
    return
  }

  return errorActionDialog('Unexpected error', [buttonActionClose()])
}

const errorHandlers: ErrorHandler[] = [
  notFoundErrorHandler,
  unexpectedErrorHandler
]

export const domainErrorHandler: ErrorHandler = (error) => {
  for (const handler of errorHandlers) {
    const maybeErrorAction = handler(error)

    if (maybeErrorAction === undefined) {
      continue
    }

    return maybeErrorAction
  }
}
