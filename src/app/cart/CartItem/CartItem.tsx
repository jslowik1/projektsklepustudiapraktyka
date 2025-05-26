"use client";
import IconButton from "@/app/components/inputs/IconButton";
import { ICartItem, useCart } from "@/app/context/CartProvider";
import { FaTrash } from "react-icons/fa";

interface CariItemProps { item: ICartItem }
const CartItem: React.FC<CariItemProps> = ({ item }) => {

    const { removeFromCart, updateQuantity } = useCart()

    const handleUpdateQuantity = (e: React.MouseEvent<HTMLButtonElement>, type: "add" | "remove") => {
        e.preventDefault();
        updateQuantity(item.id, type === "add" ? item.quantity + 1 : item.quantity - 1);
    }
    return (
        <div className="cart-item" key={item.id}>
            <div className="cart-item_name cart-item_column"><span>{item.title}</span></div>
            <div className="cart-item_quantity">
                <button onClick={(e) => handleUpdateQuantity(e, "remove")}>
                    -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={(e) => handleUpdateQuantity(e, "add")}>
                    +
                </button>
            </div>
            <div>{(item.price * item.quantity).toFixed(2)} zł</div>
            <div><IconButton Icon={() => <FaTrash />} onClick={() => removeFromCart(item.id)} /></div>
        </div>
    );
}

export default CartItem;