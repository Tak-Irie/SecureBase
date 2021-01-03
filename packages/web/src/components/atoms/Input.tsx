/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';
import { UseFormMethods, RegisterOptions } from 'react-hook-form';

type Register = Pick<UseFormMethods, 'register'>;

interface FormInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Partial<Register> {
  label: string;
  error?: string;
  rules?: RegisterOptions;
}

const Input: React.FC<FormInputProps> = ({
  label,
  register,
  rules = {},
  error,
  ...additionalInputProps
}) => {
  return (
    <div className="relative w-full mb-3">
      <div className="container mx-auto">
        <label
          className="inline-block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor={label}
        >
          {label}
        </label>
        <a className="inline-block">{error}</a>
      </div>
      <input
        name={label}
        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
        placeholder={label}
        ref={register && register(rules) && register}
        {...additionalInputProps}
      />
    </div>
  );
};

export default Input;
