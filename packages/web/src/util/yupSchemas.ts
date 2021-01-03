/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

// yup.setLocale({
//   mixed: {
//     default: '無効な値です',
//   },
//   number: {
//     min: '${path}は${min}文字以上である必要があります',
//     max: '${path}は${max}文字以下である必要があります',
//   },
// });

export const yupUserRegisterSchema = yup
  .object({
    username: yup.string().min(2).max(15).defined(),
    email: yup.string().email().defined(),
    password: yup.string().min(8).defined(),
  })
  .defined();
