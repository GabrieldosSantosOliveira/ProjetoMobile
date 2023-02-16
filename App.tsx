import { Loading } from '@components/Loading';
import { ThemeProvider } from '@contexts/ThemeContext';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { Routes } from '@routes/index';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
  });
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {isFontsLoaded ? <Routes /> : <Loading />}
      </SafeAreaView>
    </ThemeProvider>
  );
}
