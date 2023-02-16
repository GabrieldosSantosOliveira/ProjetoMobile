import { StatusBar } from '@components/StatusBar';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { ReactNode } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
interface ISelectTheme {
  text: string;
  icon: ReactNode;
  isSelect: boolean;
  onPress: () => void;
}
const SelectTheme = ({ icon, isSelect, text, onPress }: ISelectTheme) => {
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
              fontFamily: 'Poppins_400Regular',
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
export const Settings = () => {
  const { colorMode, theme, toggleColorMode } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorMode === 'dark' ? '#141c30' : '#f5f8ff',
        },
      ]}
    >
      <StatusBar
        backgroundColor={colorMode === 'dark' ? '#141c30' : '#f5f8ff'}
      />
      <Text
        style={{
          fontFamily: 'Poppins_700Bold',
          fontSize: 18,
          color: colorMode === 'dark' ? '#f5f8ff' : '#141c30',
          marginBottom: 20,
        }}
      >
        Tema
      </Text>
      <View
        style={[
          styles.containerTheme,
          {
            backgroundColor: colorMode === 'dark' ? '#f5f8ff' : '#141c30',
          },
        ]}
      >
        <SelectTheme
          icon={
            <MaterialCommunityIcons
              name="moon-last-quarter"
              size={24}
              color={colorMode === 'dark' ? 'black' : 'white'}
            />
          }
          isSelect={theme === 'automatic'}
          text="Padrão do sistema"
          onPress={() => toggleColorMode('automatic')}
        />
        <SelectTheme
          icon={
            <Ionicons
              name="moon"
              size={24}
              color={colorMode === 'dark' ? 'black' : 'white'}
            />
          }
          isSelect={theme === 'dark'}
          text="Escuro"
          onPress={() => toggleColorMode('dark')}
        />
        <SelectTheme
          icon={
            <Feather
              name="sun"
              size={24}
              color={colorMode === 'dark' ? 'black' : 'white'}
            />
          }
          isSelect={theme === 'light'}
          text="Claro"
          onPress={() => toggleColorMode('light')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerTheme: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#141c30',
  },
});
