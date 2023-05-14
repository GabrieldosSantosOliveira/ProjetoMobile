import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import { ReactNode, FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
export interface SelectThemeProps {
  text: string;
  icon: ReactNode;
  isSelect: boolean;
  onPress: () => void;
}
export const SelectTheme: FC<SelectThemeProps> = ({
  icon,
  isSelect,
  text,
  onPress,
}) => {
  const { colorMode } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          height: 60,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {icon}
          <Text
            style={{
              marginLeft: 10,
              fontFamily: FontFamily.Poppins[400],
              fontSize: FontSize.md,
              color: colorMode === 'dark' ? 'black' : 'white',
            }}
          >
            {text}
          </Text>
        </View>
        <FontAwesome
          name={isSelect ? 'circle' : 'circle-o'}
          size={16}
          color={colorMode === 'dark' ? 'black' : 'white'}
        />
      </View>
    </TouchableOpacity>
  );
};
