
export type Omit<O, K> = Pick<O, Exclude<keyof O, K>>

export function eachObject<T>(obj: {[key: string]: T}, fn: (key: string, value: T) => void) {
  Object.entries(obj).forEach(([key, value]) => {
    fn(key, value)
  })
}
