export default function PostFilter({
  field,
  value,
  onChange,
}: {
  field: String;
  value: string | number | readonly string[] | undefined;
  onChange: (value: string) => void;
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
