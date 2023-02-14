import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFontsLoaded ? <Home /> : <Loading />}
    </SafeAreaView>
  );
}
