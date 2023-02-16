import { useTheme } from '@hooks/useTheme';
import { DateZone } from '@services/DateZone';
import * as WebBrowser from 'expo-web-browser';
import { FC } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
interface Owner {
  avatar_url: string;
}
export interface IRepo {
  id: string;
  name: string;
  language?: string;
  pushed_at: Date;
  html_url: string;
  owner: Owner;
}
export const Repo: FC<IRepo> = ({
  language,
  pushed_at,
  name,
  html_url,
  owner,
}) => {
  const { colorMode } = useTheme();
  return (
    <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(html_url)}>
      <View
        style={{
          width: '100%',
          height: 130,
          backgroundColor: colorMode === 'dark' ? '#1f2a48' : '#fefefe',
          flexDirection: 'row',
          marginTop: 20,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: 16,
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
            Ultima edição: {DateZone(pushed_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
