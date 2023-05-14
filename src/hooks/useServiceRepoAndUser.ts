import { RepoDto } from '@models/RepoDto';
import { UserDto } from '@models/UserDto';
import { ServiceRepos } from '@services/ServiceRepos';
import { ServiceUser } from '@services/ServiceUser';
import { useState } from 'react';

import { useHttpService } from './useHttpService';

export const useServiceRepoAndUser = () => {
  const [repos, setRepos] = useState<RepoDto[]>([]);
  const [user, setUser] = useState<UserDto | null>(null);
  const [messageOfError, setMessageOfError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { httpService } = useHttpService();

  const serviceUser = new ServiceUser(httpService);
  const serviceRepos = new ServiceRepos(httpService);
  const handleFetchUserAndReposGithub = async (usernameGitHub: string) => {
    try {
      setIsLoading(true);
      const [repos, user] = await Promise.all([
        serviceRepos.getRepos(usernameGitHub),
        serviceUser.get(usernameGitHub),
      ]);
      setRepos(repos.data);
      setUser(user.data);
    } catch (error) {
      setRepos([]);
      setUser(null);
      if (error instanceof Error) {
        setMessageOfError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleFetchUserAndReposGithub,
    isLoading,
    messageOfError,
    repos,
    user,
  };
};
