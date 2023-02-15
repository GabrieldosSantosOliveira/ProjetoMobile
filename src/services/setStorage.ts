import AsyncStorage from '@react-native-async-storage/async-storage';
export const setStorage = async (key: string, value: unknown) => {
  try {
    const valueToJSON = JSON.stringify(value);
    await AsyncStorage.setItem(key, valueToJSON);
  } catch (error) {
    console.log(error);
  }
};
