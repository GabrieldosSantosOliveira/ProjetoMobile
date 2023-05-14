import { useStorage } from '@hooks/useStorage';
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
  theme: IThemeStorage;
  changeThemeToDark: () => void;
  changeThemeToLight: () => void;
  changeThemeToAutomatic: () => void;
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
  const { storage } = useStorage();
  const loadingTheming = useCallback(async () => {
    const theme = await storage.get<IThemeStorage>('@theme');
    setTheme((prev) => theme ?? prev);
    if (theme === 'dark') {
      setColorMode('dark');
    } else if (theme === 'light') {
      setColorMode('light');
    } else if (theme === 'automatic' && colorUI) {
      setColorMode(colorUI);
    } else if (!theme) {
      await storage.set('@theme', 'automatic');
    }
  }, [colorUI, storage]);
  useEffect(() => {
    loadingTheming();
  }, [colorUI, loadingTheming]);
  const toggleColorMode = async (theme: IThemeStorage) => {
    await storage.set('@theme', theme);
    setTheme(theme);
    loadingTheming();
  };
  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        theme,
        changeThemeToAutomatic: () => toggleColorMode('automatic'),
        changeThemeToDark: () => toggleColorMode('dark'),
        changeThemeToLight: () => toggleColorMode('light'),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
