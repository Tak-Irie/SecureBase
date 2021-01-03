import { IUseCaseError } from './useCase/IUseCaseError';
import { Result } from './Result';

export class UnexpectedError extends Result<IUseCaseError> {
  public constructor(error?: Error) {
    super(false, '予期しないエラーが発生しました', error);
  }
}
