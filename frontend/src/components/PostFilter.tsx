export default function PostFilter({
  field,
  value,
  onChange,
}: {
  field: String;
  value: String | number | readonly string[] | undefined;
  onChange: (value: String) => void;
}) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input
        type="text"
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
