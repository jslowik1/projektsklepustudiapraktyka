import "./radioGroup.scss"
interface RadioGroupProps {
    options: { value: string | number; label: string, checked: boolean, key: string; }[];
    onChange: (o: { value: string | number; label: string, checked: boolean, key: string; }) => void;
    selected: string;
}
const RadioGroup: React.FC<RadioGroupProps> = ({ options, selected, onChange }) => {
    return (
        options.map(option => {
            return <div key={option.key} className="radio-group-item" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <input className="radio" onChange={() => onChange(option)} type="radio" id={option.key} name={option.key} checked={selected === option.key} />
                <label htmlFor={option.key}>{option.label}</label>
            </div>
        })
    )
}

export default RadioGroup;