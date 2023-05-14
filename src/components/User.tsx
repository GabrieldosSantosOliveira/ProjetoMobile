import { Entypo, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { UserDto } from '@models/UserDto';
import { DateZone } from '@services/DateZone';
import { FontFamily } from '@styles/FontFamitly';
import { FontSize } from '@styles/FontSize';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { FC } from 'react';
import { View, Image, Text } from 'react-native';

import { Contact } from './Contact';
import { SocialTag } from './Social';

type IHandleOnpress = {
  mobileLink?: string;
  webLink: string;
};
const handleOnPress = async ({ webLink, mobileLink = '' }: IHandleOnpress) => {
  const isAvailable = await Linking.canOpenURL(mobileLink);
  if (isAvailable) {
    return Linking.openURL(mobileLink);
  } else {
    return WebBrowser.openBrowserAsync(webLink);
  }
};
export interface UserProps {
  user?: UserDto | null;
  showUser: boolean;
}
export const User: FC<UserProps> = ({ user, showUser }) => {
  const { colorMode } = useTheme();
  if (!showUser) return null;
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
          source={{ uri: user?.avatar_url }}
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
              fontSize: FontSize.md,
              fontFamily: FontFamily.Poppins[700],
              flex: 1,
            }}
            numberOfLines={1}
          >
            {user?.name}
          </Text>
          <Text
            style={{
              color: colorMode === 'dark' ? '#0179fb' : '#9ab7fb',
              fontSize: FontSize['2xs'],
              fontFamily: FontFamily.Poppins[700],
              marginRight: 75,
            }}
            numberOfLines={1}
          >
            {`@${user?.login}`}
          </Text>
          <Text
            style={{
              color: colorMode === 'dark' ? 'white' : '#616364',
              fontSize: FontSize.xs,
              fontFamily: FontFamily.Poppins[700],
            }}
          >
            {`Juntou-se em ${DateZone(new Date(user?.created_at || ''))}`}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: FontFamily.Poppins[400],
          color: colorMode === 'dark' ? 'white' : '#616364',
          marginTop: 20,
          lineHeight: 24,
          textAlign: 'justify',
        }}
      >
        {user?.bio}
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
        <SocialTag name="Repositórios" size={user?.public_repos || 0} />
        <SocialTag name="Seguidores" size={user?.followers || 0} />
        <SocialTag name="Seguindo" size={user?.following || 0} />
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
          text={user?.location ?? 'Localização não disponível'}
        />
        <Contact
          icon={
            <Entypo
              name="link"
              size={24}
              color={colorMode === 'dark' ? 'white' : '#788bae'}
            />
          }
          url={user?.html_url}
          onPress={() => WebBrowser.openBrowserAsync(user?.html_url || '')}
        />
        <Contact
          icon={
            <Entypo
              name="twitter"
              size={24}
              color={colorMode === 'dark' ? 'white' : '#788bae'}
            />
          }
          url={user?.twitter_username ?? 'Sem disponibilidade'}
          onPress={() => {
            if (user?.twitter_username) {
              handleOnPress({
                webLink: `https://twitter.com/${user?.twitter_username}`,
                mobileLink: `twitter/${user?.twitter_username}`,
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
          text={user?.company ?? 'Sem disponibilidade'}
        />
      </View>
    </View>
  );
};
