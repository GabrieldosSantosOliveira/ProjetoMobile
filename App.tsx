import { Loading } from '@components/Loading';
import { StatusBar } from '@components/StatusBar';
import { HttpServiceProvider } from '@contexts/HttpService';
import { StorageProvider } from '@contexts/StorageContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { Routes } from '@routes/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
  });
  return (
    <StorageProvider>
      <HttpServiceProvider>
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            {isFontsLoaded ? <Routes /> : <Loading />}
          </SafeAreaView>
        </ThemeProvider>
      </HttpServiceProvider>
    </StorageProvider>
  );
}
