import { EmptyRepoList } from '@components/EmptyRepoList';
import { Input } from '@components/Input';
import { IRepo, Repo } from '@components/Repo';
import { StatusBar } from '@components/StatusBar';
import { CardUser, IUser } from '@components/User';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

export const Home = () => {
  const { colorMode } = useTheme();
  const [usernameGitHub, setUsernameGitHub] = useState<string>('');
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [userData, setUserData] = useState<IUser>({} as IUser);
  const handleSubmit = async () => {
    try {
      const [responseRepos, responseUser] = await Promise.all([
        axios.get(`https://api.github.com/users/${usernameGitHub}/repos`),
        axios.get(`https://api.github.com/users/${usernameGitHub}`),
      ]);
      setRepos(responseRepos.data);
      setUserData(responseUser.data);
    } catch (error) {
      console.log(error);
    }
  };
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

      <Input
        LeftElement={
          <FontAwesome style={{ marginLeft: 12 }} name="search" size={24} />
        }
        value={usernameGitHub}
        placeholderTextColor={colorMode === 'dark' ? '#f5f8ff' : '#141c30'}
        placeholder="Busque seu usuário no GitHub"
        onChangeText={(text) => setUsernameGitHub(text.trim())}
        onSubmitEditing={handleSubmit}
      />

      <FlatList
        data={repos}
        ListHeaderComponent={() => {
          return 'bio' in userData ? (
            <CardUser
              avatar_url={userData.avatar_url}
              bio={userData.bio}
              company={userData.company}
              created_at={userData.created_at}
              followers={userData.followers}
              following={userData.following}
              html_url={userData.html_url}
              location={userData.location}
              login={userData.login}
              name={userData.name}
              public_repos={userData.public_repos}
              twitter_username={userData.twitter_username}
            />
          ) : null;
        }}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Repo {...item} />}
        ListEmptyComponent={EmptyRepoList}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
