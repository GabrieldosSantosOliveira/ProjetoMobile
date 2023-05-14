/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService, HttpServiceResponse } from '@interfaces/HttpService';

export class HttpServiceImpl implements HttpService {
  async get<T = any>(url: string): Promise<HttpServiceResponse<T>> {
    const res = await fetch(url);
    const data = await res.json();
    return { data, statusCode: res.status };
  }
}
