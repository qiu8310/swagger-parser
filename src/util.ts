export type Omit<O, K> = Pick<O, Exclude<keyof O, K>>
