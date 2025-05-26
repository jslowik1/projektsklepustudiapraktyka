"use client"
import { useCart } from "../context/CartProvider";
import CartItem from "./CartItem/CartItem";

const Page = () => {
    const { cart } = useCart()

    return (
        <div className="cart-items">
            {cart ? cart.map((item) => (
                <CartItem key={item.id} item={item} />
            )) : ""}
        </div>);
}

export default Page;