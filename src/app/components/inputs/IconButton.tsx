"use client";

import { IconType } from "react-icons";

interface IIconButtonProps {
    Icon: IconType;
    onClick: () => void;
    size?: number;
    text?: string;
    disabled?: boolean
    badgeText?: string;
}

const IconButton: React.FC<IIconButtonProps> = ({ Icon, onClick, size, text, disabled, badgeText }) => {
    return (
        <button type="button" className={`icon_button ${disabled ? "disabled" : ""}`} onClick={e => { e.preventDefault(); if (!disabled) onClick(); }}>
            {badgeText && <div className="badge">{<span>{badgeText}</span>}</div>}
            <Icon size={size} />
            {text ?? text}
        </button>
    );
}

export default IconButton;