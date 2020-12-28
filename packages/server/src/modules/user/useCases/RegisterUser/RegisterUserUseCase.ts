/* eslint-disable */
import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { IUserRepository } from '../../domain/IUserRepository';
import { EmailAlreadyExistsError } from './RegisterUserErrors';

type RegisterUserDTO = {
  username: string;
  email: string;
  password: string;
};
type RegisterUserResponse = Either<
  EmailAlreadyExistsError | UnexpectedError,
  Result<void>
>;
type UserTypes = UserEmail | UserName | UserPassword;

export class RegisterUserUseCase
  implements IUseCase<RegisterUserDTO, Promise<RegisterUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    request: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    const emailOrError: Result<UserEmail> = UserEmail.create(request.email);

    const passwordOrError = UserPassword.create({
      password: request.password,
    });

    const usernameOrError = UserName.create({
      username: request.username,
    });

    const verifiedResult = Result.verifyResults<UserTypes>([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);
    // must refactor
    if (verifiedResult.isFailure) {
      return left(Result.fail<any>(verifiedResult.error));
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userEmailAlreadyRegistered = await this.userRepository.confirmExistence(
        email,
      );

      if (userEmailAlreadyRegistered) {
        return left(new EmailAlreadyExistsError(email.props.email));
      }
      const userOrError = User.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure)
        return left(Result.fail<any>(userOrError.error));

      const user: User = userOrError.getValue();

      await this.userRepository.registerUser(user);

      return right(Result.success<void>());
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
