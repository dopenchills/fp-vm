export const ErrorActionTypeMap = {
  Dialog: 'Dialog'
} as const

export const ButtonActionTypeMap = {
  Close: 'Close'
} as const

export type ButtonAction = {
  type: typeof ButtonActionTypeMap.Close
}

export const buttonActionClose = () => ({
  type: ButtonActionTypeMap.Close
})

export type ErrorAction = {
  type: typeof ErrorActionTypeMap.Dialog,
  message: string,
  buttonActions: ButtonAction[]
}

export const errorActionDialog = (message: string, buttonActions: ButtonAction[]) => ({
  type: ErrorActionTypeMap.Dialog,
  message,
  buttonActions
})
