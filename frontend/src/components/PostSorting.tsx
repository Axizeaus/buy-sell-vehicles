import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface PostSortingProps {
  fields: string[];
  value: string;
  onChange: (value: string) => void;
  orderValue: string;
  onOrderChange: (order: string) => void;
}

const PostSorting: React.FC<PostSortingProps> = ({
  fields,
  value,
  onChange,
  orderValue,
  onOrderChange,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="sorting">
        <AccordionTrigger className="text-lg font-semibold">
          Sort Posts
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex items-center">
              <label htmlFor="sortBy" className="mr-2 font-medium text-nowrap">
                Sort By:
              </label>
              <select
                name="sortBy"
                id="sortBy"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="sortOrder"
                className="mr-2 font-medium text-nowrap"
              >
                Sort Order:
              </label>
              <select
                name="sortOrder"
                id="sortOrder"
                value={orderValue}
                onChange={(e) => onOrderChange(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostSorting;
