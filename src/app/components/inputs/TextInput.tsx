interface ITextInputProps {
  label?: string;
  onChange: (e: string) => void;
  placeholder?: string
}

const TextInput: React.FC<ITextInputProps> = ({ label, onChange, placeholder }) => {
  return (
    <div className="text-input">
      {label ? <span>{label}</span> : null}
      <input
        className="custom-input"
        type="text"
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => onChange(e.target.value ?? "")}
      />
    </div>
  );
};

export default TextInput;
