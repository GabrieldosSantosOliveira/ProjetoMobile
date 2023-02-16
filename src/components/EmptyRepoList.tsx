import { useTheme } from '@hooks/useTheme';
import { View, Text } from 'react-native';
export const EmptyRepoList = () => {
  const { colorMode } = useTheme();
  return (
    <View style={{ paddingVertical: 24 }}>
      <Text
        style={{
          fontFamily: 'Poppins_500Medium',
          color: colorMode === 'dark' ? 'white' : '#616364',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        Já buscou a sua conta no GitHub, busque agora e veja sua conta e todos
        os seus repositórios.
      </Text>
    </View>
  );
};
