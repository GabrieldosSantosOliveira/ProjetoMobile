import { useTheme } from '@hooks/useTheme';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import { FC } from 'react';
import { View, Text } from 'react-native';
export interface EmptyRepoListProps {
  message?: string | null;
}
export const EmptyRepoList: FC<EmptyRepoListProps> = ({ message }) => {
  const { colorMode } = useTheme();
  return (
    <View style={{ paddingVertical: 24 }}>
      <Text
        style={{
          fontFamily: FontFamily.Poppins[500],
          color: colorMode === 'dark' ? 'white' : '#616364',
          fontSize: FontSize.md,
          textAlign: 'center',
        }}
      >
        {message ||
          'Já buscou a sua conta no GitHub, busque agora e veja sua conta e todos os seus repositórios.'}
      </Text>
    </View>
  );
};
