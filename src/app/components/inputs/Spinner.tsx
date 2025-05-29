import { CgSpinner } from "react-icons/cg";
const Spinner: React.FC<{ size?: number }> = ({ size }) => {
  return <CgSpinner style={{ fontSize: size ?? "inherit" }} className="animate-spin" />;
};

export default Spinner;
