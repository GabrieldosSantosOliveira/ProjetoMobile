import { useTheme } from '@hooks/useTheme';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import { FC } from 'react';
import { View, Text } from 'react-native';
export interface ISocialTag {
  name: string;
  size: number;
}
export const SocialTag: FC<ISocialTag> = ({ name, size }) => {
  const { colorMode } = useTheme();

  return (
    <View
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Text style={{ color: '#636a7a', fontFamily: 'Poppins_400Regular' }}>
        {name}
      </Text>
      <Text
        style={{
          color: colorMode === 'dark' ? 'white' : 'black',
          fontFamily: FontFamily.Poppins[700],
          fontSize: FontSize.md,
        }}
      >
        {size}
      </Text>
    </View>
  );
};
