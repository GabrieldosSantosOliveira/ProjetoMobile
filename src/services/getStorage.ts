import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getStorage<T = unknown>(
  key: string,
): Promise<T | undefined> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  } catch (error) {
    console.log(error);
  }
}
