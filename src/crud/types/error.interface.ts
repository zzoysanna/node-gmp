export interface ErrorObject {
  status?: number | string;
  statusCode?: number;
  errors?: Error[];
  message?: string
}

export interface Error {
  path: Array<string | number>
  message: string
}
