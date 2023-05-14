import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import { View, StyleSheet, Text } from 'react-native';

import { SelectTheme } from './components/SelectTheme';

export const Settings = () => {
  const {
    colorMode,
    theme,
    changeThemeToAutomatic,
    changeThemeToDark,
    changeThemeToLight,
  } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorMode === 'dark' ? '#141c30' : '#f5f8ff',
        },
      ]}
    >
      <Text
        style={[
          styles.heading,
          { color: colorMode === 'dark' ? '#f5f8ff' : '#141c30' },
        ]}
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
          onPress={changeThemeToAutomatic}
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
          onPress={changeThemeToDark}
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
          onPress={changeThemeToLight}
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
  heading: {
    fontFamily: FontFamily.Poppins[700],
    fontSize: FontSize.lg,
    marginBottom: 20,
  },
});
