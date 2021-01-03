import { User } from '../../../../graphql/entities/User';
import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { IUserRepository } from '../../domain/IUserRepository';
import * as GetUsersErrors from './GetUsersErrors';

type GetUsersDTO = {
  users: User[];
};

type GetUsersResponse = Either<
  GetUsersErrors.UsersNotFoundError | UnexpectedError,
  Result<GetUsersDTO>
>;

export class GetUsersUseCase
  implements IUseCase<string, Promise<GetUsersResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<GetUsersResponse> {
    const FoundResult = await this.userRepository.getUsers();

    switch (typeof FoundResult) {
      case 'undefined':
        return left(new GetUsersErrors.UsersNotFoundError());
      case 'object':
        if (FoundResult === null) {
          return left(new UnexpectedError());
        }

        return right(
          Result.success<GetUsersDTO>({ users: FoundResult } as GetUsersDTO),
        );
      default:
        return left(new UnexpectedError());
    }
  }
}
