import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface PostFilterProps {
  field: string;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
}

const PostFilter: React.FC<PostFilterProps> = ({
  field,
  options,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`filter-${field}`}>
        <AccordionTrigger className="text-lg font-semibold">
          {field}
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-4">
            {options ? (
              <select
                id={`filter-${field}`}
                value={inputValue}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setInputValue(selectedValue);
                  onChange(selectedValue);
                }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option value="">Select {field}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={`filter-${field}`}
                id={`filter-${field}`}
                value={inputValue}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                placeholder={`Filter by ${field}`}
              />
            )}
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Clear
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostFilter;
