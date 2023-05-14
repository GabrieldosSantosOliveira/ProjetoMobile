/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Storage {
  get<T = any>(key: string): Promise<T | null>;
  set(key: string, item: any): Promise<void>;
}
