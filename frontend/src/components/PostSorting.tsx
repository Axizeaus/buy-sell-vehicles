import { useEffect, useState } from "react";

export default function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}: {
  fields: string[];
  value: string;
  onChange?: (value: string) => void;
  orderValue: "ascending" | "descending";
  onOrderChange?: (order: "ascending" | "descending") => void;
}) {
  const [selectedField, setSelectedField] = useState(value || fields[0]);
  const [selectedOrder, setSelectedOrder] = useState(orderValue || "ascending");

  useEffect(() => {
    if (onChange) {
      onChange(selectedField);
    }
  }, [selectedField, onChange]);

  useEffect(() => {
    if (onOrderChange) {
      onOrderChange(selectedOrder);
    }
  }, [selectedOrder, onOrderChange]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value as "ascending" | "descending");
  };

  return (
    <div>
      <label htmlFor="sortBy">Sort By: </label>
      <select
        name="sortBy"
        id="sortBy"
        value={selectedField}
        onChange={handleFieldChange}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {" / "}
      <label htmlFor="sortOrder">Sort Order: </label>
      <select
        name="sortOrder"
        id="sortOrder"
        value={selectedOrder}
        onChange={handleOrderChange}
      >
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </div>
  );
}
