import { ref } from 'vue'

export const useBusy = () => {
  const isBusy = ref(false)
  
  const withBusy = async <T>(process: () => Promise<T>): Promise<T> => {
    isBusy.value = true

    let result: T
    try {
      result = await process()
    } finally {
      isBusy.value = false
    }

    return result
  }
  
  return { isBusy, withBusy }
}
