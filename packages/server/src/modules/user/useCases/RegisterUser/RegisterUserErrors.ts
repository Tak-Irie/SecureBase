import { Result } from '../../../../shared/Result';
import { IUseCaseError } from '../../../../shared/useCase/IUseCaseError';

export class EmailAlreadyExistsError extends Result<IUseCaseError> {
  constructor(email: string, error?: Error) {
    super(false, `こちらのEmail"${email}"は既に登録されています`, error);
  }
}
