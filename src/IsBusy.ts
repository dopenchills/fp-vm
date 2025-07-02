export type IsBusy = { yes: boolean }

export const busy = (): IsBusy => ({ yes: true })
export const idle = (): IsBusy => ({ yes: false })
export const runBusy = async (process: (() => Promise<any>), isBusy: IsBusy): Promise<void> => {
  isBusy.yes = true
  await process()
  isBusy.yes = false
}
