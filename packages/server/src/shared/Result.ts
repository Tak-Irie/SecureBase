/**
 * @class throw new Error()をしないことで柔軟にエラーハンドリングするためのクラス
 * もちろん正常値のValue取得にも使えるし、型安全なビジネスロジックを書ける。
 * @method verifyResultsは複数の値オブジェクトを検査したい際に使用する。
 */
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public readonly error: string;
  private _value: T;

  public constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'Invalid Operation Error: isSuccess and error is mutual exclusive',
      );
    }
    if (!isSuccess && !error) {
      throw new Error('Invalid Operation Error: !isSuccess needs error');
    }
    if (error) this.error = error;
    if (value) this._value = value;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("can't get error value, use errorValue method");
    }

    return this._value;
  }

  public errorValue(): string {
    return this.error;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, '', value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static verifyResults<U>(results: Result<U>[]): Result<U> {
    results.find(({ isFailure }) => isFailure === true);

    return Result.success<U>();
  }
}
