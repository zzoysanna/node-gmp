export interface ErrorObject {
  status: string
  errors: Error[]
}

export interface Error {
  path: (string | number)[];
  message: string
}
