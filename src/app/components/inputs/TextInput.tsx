import { HTMLInputTypeAttribute } from "react";

interface ITextInputProps {
  label?: string;
  onChange: (e: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  value?: string;
  invalid?: boolean;
}

const TextInput: React.FC<ITextInputProps> = ({
  label,
  onChange,
  placeholder,
  type,
  disabled,
  value,
  invalid
}) => {
  return (
    <div className="text-input">
      {label ? <label className="text-input-label">{label}</label> : null}
      <input
        disabled={disabled}
        className={`custom-input ${invalid ? 'invalid' : ''}`}
        type={type ?? "text"}
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => onChange(e.target.value ?? "")}
        value={value}
        aria-invalid={invalid}
      />
    </div>
  );
};

export default TextInput;
