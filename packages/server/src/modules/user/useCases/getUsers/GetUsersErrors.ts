import { Result } from '../../../../shared/Result';
import { IUseCaseError } from '../../../../shared/useCase/IUseCaseError';

export class UsersNotFoundError extends Result<IUseCaseError> {
  constructor() {
    super(false, 'ユーザーが登録されていません');
  }
}
