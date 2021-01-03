import React from 'react';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] } & HTMLSelectElement;

const Select = React.forwardRef<SelectProps, { label: string }>(
  ({ label }, ref) => (
    <>
      <label htmlFor={label}>{label}</label>
      <select name={label} ref={ref}>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  ),
);

export default Select;
