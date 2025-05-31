import { HTMLInputTypeAttribute } from "react";

interface ITextInputProps {
  label?: string;
  onChange: (e: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

const TextInput: React.FC<ITextInputProps> = ({
  label,
  onChange,
  placeholder,
  type,
  disabled
}) => {
  return (
    <div className="text-input">
      {label ? <span style={{ margin: "5px 0" }}>{label}</span> : null}
      <input
        disabled={disabled}
        className="custom-input"
        type={type ?? "text"}
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => onChange(e.target.value ?? "")}
      />
    </div>
  );
};

export default TextInput;
