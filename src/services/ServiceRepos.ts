import { UnexpectedError } from '@errors/UnexpectedError';
import { UserNotFoundError } from '@errors/UserNotFoundError';
import { HttpService } from '@interfaces/HttpService';
import { RepoDto } from '@models/RepoDto';

export class ServiceRepos {
  constructor(private httpService: HttpService) {}
  async getRepos(usernameGitHub: string) {
    const { data, statusCode } = await this.httpService.get<RepoDto[]>(
      `https://api.github.com/users/${usernameGitHub}/repos`,
    );
    switch (statusCode) {
      case 200:
        return { data, statusCode };
        break;
      case 404:
        throw new UserNotFoundError();
        break;
      default:
        throw new UnexpectedError();
        break;
    }
  }
}
