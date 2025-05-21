"use client";

import { IconType } from "react-icons";

interface IIconButtonProps {
    Icon: IconType;
    onClick: () => void;
    size?: number;
    text?: string;
    disabled?: boolean
}

const IconButton: React.FC<IIconButtonProps> = ({ Icon, onClick, size, text, disabled }) => {
    return (
        <button className={`icon_button ${disabled ? "disabled" : ""}`} onClick={!disabled ? onClick : undefined}>
            <Icon size={size} />
            {text ?? text}
        </button>
    );
}

export default IconButton;