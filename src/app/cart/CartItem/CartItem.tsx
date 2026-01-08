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

    const finalPrice = item.onSale && item.salePrice ? item.salePrice : item.price;

    return (
        <div className="cart-item" key={item.id}>
            <div className="cart-item_name">
                <span className="cart-item_title">{item.title}</span>
                <span className="cart-item_category">{item.category}</span>
                {item.onSale && item.salePrice && (
                    <span className="cart-item_sale-badge">PROMOCJA</span>
                )}
            </div>
            <div className="cart-item_price">
                {item.onSale && item.salePrice ? (
                    <>
                        <span className="cart-item_old-price">{item.price.toFixed(2)} zł</span>
                        <span className="cart-item_new-price">{item.salePrice.toFixed(2)} zł</span>
                    </>
                ) : (
                    <span>{item.price.toFixed(2)} zł</span>
                )}
            </div>
            <div className="cart-item_quantity">
                <button onClick={(e) => handleUpdateQuantity(e, "remove")} disabled={item.quantity <= 1}>
                    -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={(e) => handleUpdateQuantity(e, "add")}>
                    +
                </button>
            </div>
            <div className="cart-item_total">
                <span className="cart-item_total-label">Suma:</span>
                <span className="cart-item_total-price">{(finalPrice * item.quantity).toFixed(2)} zł</span>
            </div>
            <div className="cart-item_actions">
                <IconButton
                    Icon={() => <FaTrash />}
                    onClick={() => removeFromCart(item.id)}
                    text=""
                />
            </div>
        </div>
    );
}

export default CartItem;