import { ref, type Ref } from 'vue'

export type IsBusy = { yes: boolean }

export const busy = (): IsBusy => ({ yes: true })
export const idle = (): IsBusy => ({ yes: false })
export const runBusy = async (isBusy: IsBusy, process: (() => Promise<any>)): Promise<void> => {
  isBusy.yes = true
  await process()
  isBusy.yes = false
}

export const useBusy = () => {
  const isBusy = ref<IsBusy>({ yes: false })
  
  const runBusy = async (process: () => Promise<any>): Promise<void> => {
    isBusy.value.yes = true
    await process()
    isBusy.value.yes = false
  }
  
  return { isBusy, runBusy }
}
