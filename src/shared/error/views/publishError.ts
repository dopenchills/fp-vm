import type { DomainError, DomainErrorNameMap } from "../model/DomainError";

export const publishError = (error: DomainError): void => {
  window.dispatchEvent(new CustomEvent('DomainError', {
    detail: error
  }))
}

export const publishResetError = (errorType?: keyof typeof DomainErrorNameMap) => {
  window.dispatchEvent(new CustomEvent('ResetDomainError', {
    detail: errorType
  }))
}
