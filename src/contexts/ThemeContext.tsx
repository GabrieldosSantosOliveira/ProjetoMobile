import { getStorage } from '@services/getStorage';
import { setStorage } from '@services/setStorage';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
interface IThemeContext {
  colorMode: 'dark' | 'light';
  toggleColorMode: (theme: IThemeStorage) => void;
}
export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
interface IThemeProvider {
  children: ReactNode;
}
type IThemeStorage = 'dark' | 'light' | 'automatic';
export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('dark');
  const colorUI = useColorScheme();
  const loadingTheming = useCallback(async () => {
    const theme = await getStorage<IThemeStorage>('@theme');
    if (theme === 'dark') {
      setColorMode('dark');
    } else if (theme === 'light') {
      setColorMode('light');
    } else if (theme === 'automatic' && colorUI) {
      setColorMode(colorUI);
    } else if (!theme) {
      await setStorage('@theme', 'automatic');
    }
  }, [colorUI]);
  useEffect(() => {
    loadingTheming();
  }, [colorUI, loadingTheming]);
  const toggleColorMode = async (theme: IThemeStorage) => {
    await setStorage('@theme', theme);
    loadingTheming();
  };
  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
