import * as yup from 'yup';

export const yupUserRegisterSchema = yup
  .object({
    username: yup
      .string()
      .min(2, '2文字以上の入力をお願いします')
      .max(20, '20文字以下の入力をお願いします')
      .defined(),
    email: yup
      .string()
      .email(
        "メールアドレスの形式を満たしていません。' ~ @ ~ .com' と入力をお願いします",
      )
      .defined(),
    password: yup
      .string()
      .min(8, 'パスワードは8文字以上の入力をお願いします')
      .defined(),
  })
  .defined();
