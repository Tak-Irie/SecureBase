import { FC } from 'react';

type ButtonProps = {
  buttonLabel: string;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
};

const Button: FC<ButtonProps> = (props) => {
  const { onClick, buttonLabel } = props;

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;
