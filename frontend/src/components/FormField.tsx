import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
  min?: number;
  max?: number;
  rows?: number;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
  min,
  max,
  rows,
  options,
}) => {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}:</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className="border p-2 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="border p-2 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          className="border p-2 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
        />
      )}
    </div>
  );
};

export default FormField;
