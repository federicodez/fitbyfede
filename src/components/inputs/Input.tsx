"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  tabIndex?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  placeholder,
  required,
  errors,
  type = "text",
  disabled,
  tabIndex,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block 
          text-base
          font-medium 
          leading-6 
          text-blue-300
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          tabIndex={tabIndex}
          type={type}
          placeholder={placeholder}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            bg-white
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default",
          )}
        />
      </div>
    </div>
  );
};

export default Input;
