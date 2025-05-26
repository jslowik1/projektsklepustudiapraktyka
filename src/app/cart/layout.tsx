"use client";
import { useEffect, useState } from "react";
import IconButton from "../components/inputs/IconButton";
import TextInput from "../components/inputs/TextInput";
import { useCart } from "../context/CartProvider";

import { FaCheck } from "react-icons/fa";
import ProgressBar from "../components/inputs/ProgressBar";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const { cart } = useCart()
    const [code, setCode] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const [isApplied, setIsApplied] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(15);

    useEffect(() => {
        setTotalItems(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }, [cart])

    const applyDiscount = () => {
        if (code === "10") {
            setDiscount(10);
        } else if (code === "20") {
            setDiscount(20);
        } else if (code === "30") {
            setDiscount(30);
        }
    }

    useEffect(() => {
        setTotal(totalItems + (totalItems > 500 ? 0 : shipping) - (totalItems * (discount / 100)));
    }, [discount, totalItems, shipping])

    return (
        <div className="product-main">
            <div className="product-list">
                <div className="cart">
                    <h1>Koszyk</h1>
                    <div className="cart-container">
                        {children}
                        <div className="cart-summary">
                            <span>Podsumowanie</span>
                            <div className="cart-summary-value">
                                <span className="cart-summary-value-item"><span>Produkty</span> {totalItems.toFixed(2)} zł</span>
                                {discount > 0 ? <span className="cart-summary-value-item"><span>Zniżka</span> - {(totalItems * (discount / 100)).toFixed(2)} zł </span> : null}
                                {totalItems < 500 && <span className="cart-summary-value-item"><span>Dostawa</span> {totalItems > 500 ? 0 : shipping.toFixed(2)} zł </span>}
                                <ProgressBar label={totalItems < 500 ? `Do darmowej dostawy brakuje ${(500 - totalItems).toFixed(2)} zł` : "Darmowa dostawa 👏"} value={totalItems > 500 ? 100 : (totalItems / 500) * 100} />
                                <span className="cart-summary-value-item"><span>Łącznie</span> {total.toFixed(2)} zł </span>
                                <div className="cart-summary-value-code">
                                    <TextInput placeholder="Wprowadź kod promocyjny" label="Kod promocyjny" onChange={setCode} />
                                    <IconButton disabled={code === ""} onClick={() => { applyDiscount() }} text="Zastosuj" Icon={FaCheck} />
                                </div>
                                <button className="cart-summary-value-button">Wybierz sposób dostawy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;