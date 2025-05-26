interface IDropdownProps {
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: "asc" | "desc") => void;
  value: "asc" | "desc";
}

const Dropdown: React.FC<IDropdownProps> = ({
  options,
  onChange,
  label,
  value,
}) => {
  if (!options || options.length === 0) return null;
  return (
    <div className="custom-dropdown-container">
      {label ? <span>{label}</span> : null}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "asc" | "desc")}
        className="custom-input"
        name=""
        id=""
      >
        {options.map((option: { value: string; label: string }) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
