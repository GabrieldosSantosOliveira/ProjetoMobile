import { createContext, FC, ReactNode, useState } from 'react';
export interface IInputContext {
  isFocus: boolean;
  changeHasFocus: () => void;
  changeNoHasFocus: () => void;
}
export const InputContext = createContext<IInputContext>({} as IInputContext);
export interface IInputProvider {
  children: ReactNode;
}
export const InputProvider: FC<IInputProvider> = ({ children }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const changeHasFocus = () => {
    setIsFocus(true);
  };
  const changeNoHasFocus = () => {
    setIsFocus(false);
  };
  return (
    <InputContext.Provider
      value={{ isFocus, changeHasFocus, changeNoHasFocus }}
    >
      {children}
    </InputContext.Provider>
  );
};
