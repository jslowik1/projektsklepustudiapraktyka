"use client";
import IconButton from "@/app/components/inputs/IconButton";
import { ICartItem, useCart } from "@/app/context/CartProvider";
import { translateCategory } from "@/app/tools/Tools";
import { FaTrash } from "react-icons/fa";

interface CariItemProps { item: ICartItem }
const CartItem: React.FC<CariItemProps> = ({ item }) => {

    const { removeFromCart, updateQuantity } = useCart()
    return (
        <div className="cart-item" key={item.id}>
            <div className="cart-item_name cart-item_column"><span>{item.title}</span> <span className="cart-item_category">{translateCategory(item.category)}</span></div>
            <div>{item.price * item.quantity} zł</div>
            <div><input type="number" value={item.quantity} onChange={(e) => { updateQuantity(item.id, Number(e.target.value)) }} /></div>
            <div><IconButton Icon={() => <FaTrash />} onClick={() => removeFromCart(item.id)} /></div>
        </div>
    );
}

export default CartItem;