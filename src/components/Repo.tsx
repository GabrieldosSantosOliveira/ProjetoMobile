import { useTheme } from '@hooks/useTheme';
import { RepoDto } from '@models/RepoDto';
import { DateZone } from '@services/DateZone';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import * as WebBrowser from 'expo-web-browser';
import { FC, memo } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
export interface RepoProps {
  repo: RepoDto;
}
export const RepoBase: FC<RepoProps> = ({
  repo: { language, pushed_at, name, html_url, owner },
}) => {
  const { colorMode } = useTheme();
  return (
    <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(html_url)}>
      <View
        style={[
          styles.container,
          { backgroundColor: colorMode === 'dark' ? '#1f2a48' : '#fefefe' },
        ]}
      >
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: FontFamily.Poppins[500],
              fontSize: FontSize.md,
              color: colorMode === 'dark' ? '#f5f8ff' : '#616364',
            }}
          >
            {name}
          </Text>
          <Image
            style={{ width: 45, height: 45, borderRadius: 50 }}
            source={{ uri: owner.avatar_url }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              color: colorMode === 'dark' ? '#f5f8ff' : '#616364',
            }}
          >
            {language}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              color: colorMode === 'dark' ? '#f5f8ff' : '#616364',
            }}
          >
            Ultima edição: {pushed_at ? DateZone(new Date(pushed_at)) : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Repo = memo(RepoBase);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
