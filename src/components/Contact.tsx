import { useTheme } from '@hooks/useTheme';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import { FC, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
export interface IContact {
  icon: ReactNode;
  url?: string;
  text?: string;
  onPress?: () => void;
}
export const Contact: FC<IContact> = ({ icon, url, text, onPress }) => {
  const { colorMode } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}
      >
        {icon}
        <Text
          style={{
            fontFamily: FontFamily.Poppins[400],
            fontSize: FontSize.sm,
            marginLeft: 8,
            color: colorMode === 'dark' ? 'white' : '#616364',
          }}
        >
          {text ?? url}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
