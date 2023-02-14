import { Input } from '@components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input
        LeftElement={<FontAwesome name="bank" />}
        autoComplete="name-given"
      />
      <Input
        textContentType="password"
        LeftElement={<FontAwesome size={15} name="bank" />}
        autoComplete="password-new"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
