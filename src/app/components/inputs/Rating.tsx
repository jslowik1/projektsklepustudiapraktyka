import { FaStar, FaRegStar } from "react-icons/fa";
interface IRatingProps {
    rating: number;
    reviewCount?: number
}
const CustomRating: React.FC<IRatingProps> = ({ rating, reviewCount }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        {ratingValue <= rating ? <FaStar /> : <FaRegStar />}
                    </label>
                );
            })}

            <span style={{ marginLeft: 5 }}>({reviewCount})</span>
        </div>
    );
}

export default CustomRating;