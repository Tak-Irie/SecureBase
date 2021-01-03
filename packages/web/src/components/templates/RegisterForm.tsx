import { FC } from 'react';
import Form from '../molecules/Form';

export const RegisterForm: FC = () => {
  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div className="text-gray-500 text-center mb-3 font-bold">
        <small>Or sign up with credentials</small>
      </div>
      <Form />
    </div>
  );
};
