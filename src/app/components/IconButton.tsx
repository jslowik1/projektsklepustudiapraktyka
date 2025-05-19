"use client";

import { IconType } from "react-icons";

interface IIconButtonProps {
    Icon: IconType;
    onClick: () => void;
    size?: number;
    text?: string;
}

const IconButton: React.FC<IIconButtonProps> = ({ Icon, onClick, size, text }) => {
    return (
        <button className="icon_button" onClick={onClick}>
            <Icon size={size} />
            {text ?? text}
        </button>
    );
}

export default IconButton;