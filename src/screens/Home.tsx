import { EmptyRepoList } from '@components/EmptyRepoList';
import { Input } from '@components/Input/Input';
import { Root } from '@components/Input/Root';
import { Loading } from '@components/Loading';
import { Repo } from '@components/Repo';
import { User } from '@components/User';
import { FontAwesome } from '@expo/vector-icons';
import { useServiceRepoAndUser } from '@hooks/useServiceRepoAndUser';
import { useTheme } from '@hooks/useTheme';
import { RepoDto } from '@models/RepoDto';
import { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';

export const Home = () => {
  const [usernameGitHub, setUsernameGitHub] = useState<string>('');
  const {
    isLoading,
    handleFetchUserAndReposGithub,
    repos,
    messageOfError,
    user,
  } = useServiceRepoAndUser();

  const showUser = user?.created_at ? true : false;
  const { colorMode } = useTheme();

  const renderItem: ListRenderItem<RepoDto> = useCallback(
    ({ item }) => <Repo repo={item} />,
    [],
  );
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorMode === 'dark' ? '#141c30' : '#f5f8ff',
        },
      ]}
    >
      <Root>
        <FontAwesome name="search" size={24} />
        <Input
          value={usernameGitHub}
          placeholderTextColor={colorMode === 'dark' ? '#f5f8ff' : '#141c30'}
          placeholder="Busque seu usuário no GitHub"
          onChangeText={(text) => setUsernameGitHub(text.trim())}
          onSubmitEditing={() => handleFetchUserAndReposGithub(usernameGitHub)}
        />
      </Root>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={repos}
          ListHeaderComponent={() => <User user={user} showUser={showUser} />}
          style={{ width: '100%' }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }) => String(id)}
          renderItem={renderItem}
          ListEmptyComponent={() => <EmptyRepoList message={messageOfError} />}
        />
      )}
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
