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
  theme: IThemeStorage;
}
export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
interface IThemeProvider {
  children: ReactNode;
}
type IThemeStorage = 'dark' | 'light' | 'automatic';
export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('dark');
  const [theme, setTheme] = useState<IThemeStorage>('automatic');
  const colorUI = useColorScheme();
  const loadingTheming = useCallback(async () => {
    const theme = await getStorage<IThemeStorage>('@theme');
    setTheme((prev) => theme ?? prev);
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
    setTheme(theme);
    loadingTheming();
  };
  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
