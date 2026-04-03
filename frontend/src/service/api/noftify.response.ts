export interface NoftifyResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}
