import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <label className="block text-gray-800 dark:text-gray-200">
      {label}:
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-900"
      />
    </label>
  );
};

export default TextInput;
