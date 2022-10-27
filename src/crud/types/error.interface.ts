export interface ErrorObject {
  status: string
  errors: Error[]
}

export interface Error {
  path: Array<string | number>
  message: string
}
