import type { DomainError, DomainErrorNameMap } from "../model/DomainError";

export const subscribeError = (handler: (error: DomainError) => void): void => {
  window.addEventListener('DomainError', (e) => {
    handler((e as CustomEvent<DomainError>).detail)
  })
}

export const subscribeResetError = (handler: (errorType: keyof typeof DomainErrorNameMap | null) => void): void => {
  window.addEventListener('ResetDomainError', (e) => {
    handler((e as CustomEvent<keyof typeof DomainErrorNameMap>).detail)
  })
}
