/* eslint-disable @typescript-eslint/no-explicit-any */
import { Storage } from '@interfaces/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export class StorageImpl implements Storage {
  async get<T = any>(key: string): Promise<T | null> {
    const item = await AsyncStorage.getItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }
  async set(key: string, item: any): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  }
}
