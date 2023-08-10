import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...register}
        id={name}
        className="mt-1 p-2 shadow-sm w-full border focus:ring-sky-500 rounded-md invalid:text-pink-600 invalid:border-pink-500 border-gray-300 focus:border-sky-500 "
        rows={4}
        {...rest}
      />
    </div>
  );
}
