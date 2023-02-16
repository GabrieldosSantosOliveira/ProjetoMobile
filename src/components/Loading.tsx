import { StatusBar } from '@components/StatusBar';
import { useTheme } from '@hooks/useTheme';
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => {
  const { colorMode } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorMode === 'dark' ? '#141c30' : '#f5f8ff',
      }}
    >
      <StatusBar
        backgroundColor={colorMode === 'dark' ? '#141c30' : '#f5f8ff'}
      />
      <ActivityIndicator
        size="large"
        color={colorMode === 'dark' ? '#f5f8ff' : '#141c30'}
      />
    </View>
  );
};
