import { ref } from 'vue'

export const useBusy = () => {
  const isBusy = ref(false)
  
  const withBusy = async (process: () => Promise<any>): Promise<void> => {
    isBusy.value = true
    await process()
    isBusy.value = false
  }
  
  return { isBusy, withBusy }
}
