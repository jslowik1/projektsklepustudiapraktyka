interface ITextInputProps {
  label?: string;
  onChange: (e: string) => void;
}

const TextInput: React.FC<ITextInputProps> = ({ label, onChange }) => {
  return (
    <div className="text-input">
      {label ? <span>{label}</span> : null}
      <input
        className="custom-input"
        type="text"
        onChange={(e) => onChange(e.target.value ?? "")}
      />
    </div>
  );
};

export default TextInput;
