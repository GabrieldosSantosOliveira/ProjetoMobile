/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpServiceResponse<T> {
  data: T;
  statusCode: number;
}
export interface HttpService {
  get<T = any>(url: string): Promise<HttpServiceResponse<T>>;
}
