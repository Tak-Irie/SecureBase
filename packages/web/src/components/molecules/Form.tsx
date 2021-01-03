/* eslint-disable @typescript-eslint/unbound-method */
import Input from 'components/atoms/Input';
import { useUserRegisterMutation } from 'graphql/generated/graphql';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SchemaOf } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupUserRegisterSchema } from 'util/yupSchemas';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const schema: SchemaOf<IFormInput> = yupUserRegisterSchema;

const Form: FC = () => {
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm<IFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [userRegister] = useUserRegisterMutation();
  const onSubmit = async (values: IFormInput) => {
    try {
      const response = await userRegister({
        variables: { userRegisterOptions: values },
        // update: (cache, { data }) => {
        //   cache.writeQuery<MeQuery>({
        //     query: MeDocument,
        //     data: {
        //       __typename: 'Query',
        //       me: data?.register.user,
        //     },
        //   });
        // },
      });
      console.log(':', response);
      if (response.data?.userRegister.user) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/');
      }
    } catch (err) {
      console.log('register fail', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="username" type="text" register={register} />
      <p>{errors.username?.message}</p>
      <Input label="email" type="email" register={register} />
      <p>{errors.email?.message}</p>
      {errors.email && 'email is required'}
      <Input label="password" type="password" register={register} />
      <p>{errors.password?.message}</p>

      <div>
        <label
          className="inline-flex items-center cursor-pointer"
          htmlFor="customCheckLogin"
        >
          <input
            id="customCheckLogin"
            type="checkbox"
            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
          />
          <span className="ml-2 text-sm font-semibold text-gray-700">
            I agree with the{' '}
            <a
              href="#pablo"
              className="text-blue-500"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
      <div className="text-center mt-6">
        {/* <button
          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            const values = getValues();
            console.log(':', values);
          }}
        >
          getValues
        </button> */}
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Form;
