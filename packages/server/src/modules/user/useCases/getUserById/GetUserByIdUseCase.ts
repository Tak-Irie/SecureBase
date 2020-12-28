import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { IUserRepository } from '../../domain/IUserRepository';
import * as GetUserByIdErrors from './GetUserByIdErrors';

type GetUserByIdDTO = {
  id: string;
  username: string;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
};

type GetUserByIdResponse = Either<
  GetUserByIdErrors.UserNotFoundError | UnexpectedError,
  Result<GetUserByIdDTO>
>;

export class GetUserByIdUseCase
  implements IUseCase<string, Promise<GetUserByIdResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<GetUserByIdResponse> {
    const FoundResult = await this.userRepository.getUserByUserId(userId);

    switch (typeof FoundResult) {
      case 'undefined':
        return left(new GetUserByIdErrors.UserNotFoundError(userId));
      case 'object':
        if (FoundResult === null) {
          return left(new UnexpectedError());
        }

        return right(
          Result.success<GetUserByIdDTO>(FoundResult as GetUserByIdDTO),
        );
      default:
        return left(new UnexpectedError());
    }
  }
}
