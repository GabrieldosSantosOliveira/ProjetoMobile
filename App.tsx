import { Loading } from '@components/Loading';
import { ThemeProvider } from '@contexts/ThemeContext';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Home } from '@screens/Home';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {isFontsLoaded ? <Home /> : <Loading />}
      </SafeAreaView>
    </ThemeProvider>
  );
}
