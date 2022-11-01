export interface ErrorObject {
  status?: number | string;
  statusCode?: number;
  errors?: Error[]
}

export interface Error {
  path: Array<string | number>
  message: string
}
