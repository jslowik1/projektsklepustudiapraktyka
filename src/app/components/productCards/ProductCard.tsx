"use client";
import { IProduct } from "@/app/model/IProduct";
import IconButton from "../IconButton";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/app/context/CartProvider";
interface IProductCardProps {
    item: IProduct
}
const ProductCard: React.FC<IProductCardProps> = ({ item }) => {
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart(item);
    }

    const router = useRouter();
    if (item)
        return (<div className="product-card">
            <div className={`product-card_img ${item.category}`} />
            <div className="product-card_desc">
                <div>{item.title}</div>
                <div>{item.price} zł</div>
                <div className="buttons">
                    <button onClick={() => { router.push(`/categories/${item.category}/${item.internalName}`) }} className="product-card_desc-button">Zobacz produkt</button>
                    <IconButton Icon={() => <FaCartPlus />} onClick={() => { handleAddToCart() }} />
                </div>
            </div>
        </div>);
}

export default ProductCard;