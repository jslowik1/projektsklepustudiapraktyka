"use client"
import { useCart } from "../context/CartProvider";
import CartItem from "./CartItem/CartItem";

const Page = () => {
    const { cart } = useCart()

    return (<div className="cart">
        <h1>Koszyk</h1>
        <div className="cart-container">
            <div className="cart-items">
                {cart ? cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                )) : ""}
            </div>
            <div className="cart-summary">
                <span>Podsumowanie</span>
                <div className="cart-summary-value">
                    <span className="cart-summary-value-item"><span>Produkty</span> {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} zł</span>
                    <span className="cart-summary-value-item"><span>Dostawa</span> 15 zł </span>
                    <span className="cart-summary-value-item"><span>Łącznie</span> {cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 15} zł </span>
                </div>
            </div>
        </div>
    </div >);
}

export default Page;