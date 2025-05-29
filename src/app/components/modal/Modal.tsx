import { IoClose } from "react-icons/io5";
import IconButton from "../inputs/IconButton";

interface IModalProps {
    children: React.ReactNode;
    onDimiss: () => void;
    width?: number;
    height?: number
    headerText?: string;
}
const Modal: React.FC<IModalProps> = ({ children, width, height, headerText, onDimiss }) => {
    return (
        <div className="modal" style={{ width, height }}>
            <div className="modal_header">
                <span>{headerText}</span>
                <IconButton Icon={IoClose} size={40} onClick={() => onDimiss()} />
            </div>
            <div className="modal_content">
                {children}
            </div>
        </div>
    );
}

export default Modal;