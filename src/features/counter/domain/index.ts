export type Count = number
export type CounterCommand = '+' | '-'

export type History = {
  count: Count
  command: CounterCommand
}

export type SimpleCounterData = {
  count: Count
  history: History[]
}

export const increment = (data: SimpleCounterData): SimpleCounterData => 
  ({
    count: data.count + 1,
    history: [
      ...data.history,
      {
        count: data.count + 1,
        command: '+'
      }
    ]
  })

export const decrement = (data: SimpleCounterData): SimpleCounterData =>
  ({
    count: data.count - 1,
    history: [
      ...data.history,
      {
        count: data.count - 1,
        command: '-'
      }
    ]
  })

export const undo = (data: SimpleCounterData): SimpleCounterData => {
  if (data.history.length === 0) {
    return data
  }

  const latestCommand = data.history[data.history.length - 1].command

  const newHistory = data.history.slice(0, -1)
  const previousCount = latestCommand === '+' ? data.count - 1 : data.count + 1

  return {
    count: previousCount,
    history: newHistory
  }
}
