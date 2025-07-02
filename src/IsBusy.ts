export type IsBusy = { yes: boolean }

export const busy = (): IsBusy => ({ yes: true })
export const idle = (): IsBusy => ({ yes: false })
export const runBusy = async (isBusy: IsBusy, process: (() => Promise<any>)): Promise<void> => {
  isBusy.yes = true
  await process()
  isBusy.yes = false
}
