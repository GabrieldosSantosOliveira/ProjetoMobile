import { UnexpectedError } from '@errors/UnexpectedError';
import { UserNotFoundError } from '@errors/UserNotFoundError';
import { HttpService } from '@interfaces/HttpService';
import { UserDto } from '@models/UserDto';

export class ServiceUser {
  constructor(private httpService: HttpService) {}
  async get(usernameGitHub: string) {
    const { data, statusCode } = await this.httpService.get<UserDto>(
      `https://api.github.com/users/${usernameGitHub}`,
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
