const ProgressBar: React.FC<{ value: number, label?: string }> = ({ value, label }) => {
    return (
        <div className="progress-bar-container">
            {label ? <span>{label}</span> : null}
            <div className="progress-bar">
                <div className="progress-bar_progress" style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}

export default ProgressBar;