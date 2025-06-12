/* eslint-disable @typescript-eslint/no-explicit-any */
interface IDropdownProps {
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: any) => void;
  value: any;
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
      {label ? <span style={{ margin: "5px 0" }}>{label}</span> : null}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
