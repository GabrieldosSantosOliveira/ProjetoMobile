import { Entypo, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { DateZone } from '@services/DateZone';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { FC } from 'react';
import { View, Image, Text } from 'react-native';

import { Contact } from './Contact';
import { SocialTag } from './Social';
export interface IUser {
  avatar_url: string;
  name: string;
  login: string;
  created_at: Date;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  location?: string;
  html_url: string;
  twitter_username?: string;
  company?: string;
}
type IHandleOnpress = {
  mobileLink?: string;
  webLink: string;
};
const handleOnPress = async ({ webLink, mobileLink = '' }: IHandleOnpress) => {
  try {
    const isAvailable = await Linking.canOpenURL(mobileLink);
    if (isAvailable) {
      return Linking.openURL(mobileLink);
    } else {
      return WebBrowser.openBrowserAsync(webLink);
    }
  } catch (error) {
    console.log(error);
  }
};
export const CardUser: FC<IUser> = ({
  avatar_url,
  bio,
  company,
  created_at,
  followers,
  following,
  html_url,
  location,
  login,
  name,
  public_repos,
  twitter_username,
}) => {
  const { colorMode } = useTheme();
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 12,
        backgroundColor: colorMode === 'dark' ? '#1f2a48' : '#fefefe',
        marginTop: 20,
        padding: 15,
        shadowColor: colorMode === 'dark' ? '#000' : '#fff',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: avatar_url }}
          style={{ width: 90, height: 90, borderRadius: 50 }}
        />
        <View
          style={{
            paddingLeft: 20,
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              color: colorMode === 'dark' ? '#e2ebf2' : '#4a4f54',
              fontSize: 16,
              fontFamily: 'Poppins_700Bold',
              marginRight: 75,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              color: colorMode === 'dark' ? '#0179fb' : '#9ab7fb',
              fontSize: 10,
              fontFamily: 'Poppins_700Bold',
              marginRight: 75,
            }}
            numberOfLines={1}
          >
            {`@${login}`}
          </Text>
          <Text
            style={{
              color: colorMode === 'dark' ? 'white' : '#616364',
              fontSize: 12,
              fontFamily: 'Poppins_700Bold',
            }}
          >
            {`Juntou-se em ${DateZone(created_at)}`}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: 'Poppins_400Regular',
          color: colorMode === 'dark' ? 'white' : '#616364',
          marginTop: 20,
          lineHeight: 24,
          textAlign: 'justify',
        }}
      >
        {bio}
      </Text>
      <View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: colorMode === 'dark' ? '#141c30' : '#f5f8ff',
          borderRadius: 8,
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginTop: 10,
        }}
      >
        <SocialTag name="Repositórios" size={public_repos} />
        <SocialTag name="Seguidores" size={followers} />
        <SocialTag name="Seguindo" size={following} />
      </View>
      <View style={{ marginTop: 14 }}>
        <Contact
          icon={
            <Entypo
              name="location-pin"
              size={24}
              color={colorMode === 'dark' ? 'white' : '#788bae'}
            />
          }
          text={location ?? 'Localização não disponível'}
        />
        <Contact
          icon={
            <Entypo
              name="link"
              size={24}
              color={colorMode === 'dark' ? 'white' : '#788bae'}
            />
          }
          url={html_url}
          onPress={() => WebBrowser.openBrowserAsync(html_url)}
        />
        <Contact
          icon={
            <Entypo
              name="twitter"
              size={24}
              color={colorMode === 'dark' ? 'white' : '#788bae'}
            />
          }
          url={twitter_username ?? 'Sem disponibilidade'}
          onPress={() => {
            if (twitter_username) {
              handleOnPress({
                webLink: `https://twitter.com/${twitter_username}`,
                mobileLink: `twitter/${twitter_username}`,
              });
            }
          }}
        />
        <Contact
          icon={
            <Ionicons
              name="business-outline"
              size={24}
              color={colorMode === 'dark' ? 'white' : '#788bae'}
            />
          }
          text={company ?? 'Sem disponibilidade'}
        />
      </View>
    </View>
  );
};
