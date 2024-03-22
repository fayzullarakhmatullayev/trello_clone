type CallbackFunction = (...args: any[]) => void

export const useDebounce = <T extends object>(
  cb: CallbackFunction,
  delay: number
): CallbackFunction => {
  let timer: ReturnType<typeof setTimeout>

  return function (this: T, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(this, args)
    }, delay)
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
