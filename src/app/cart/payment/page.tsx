"use client"
import { useAuth } from "@/app/context/AuthProvider";
import { useCart } from "@/app/context/CartProvider";
import { useCreateOrder } from "@/hooks/mutations/useCreateOrderMutation";
import { useState } from "react";
import "./payment.scss"
import OrderInfo from "./OrderInfo";
import Spinner from "@/app/components/inputs/Spinner";

const Page = () => {
    const [orderId, setOrderId] = useState<string>();

    const { cart, clearCart } = useCart();
    const { user, userData } = useAuth();
    const createOrderMutation = useCreateOrder();

    const handleOrder = () => {
        if (user && cart && userData)
            void createOrderMutation.mutateAsync({ user: user, cart: cart, shippingAddress: userData.address })
                .then(docInfo => {
                    setOrderId(docInfo.id);
                    clearCart();
                })
    }

    return (<div className="payment">
        {createOrderMutation.status === "idle" ? <button onClick={() => handleOrder()}>Złóż zamówienie</button> : null}
        {createOrderMutation.status === "pending" ? <Spinner size={30} /> : null}
        {(createOrderMutation.status !== "idle" && createOrderMutation.status !== "pending") ? <OrderInfo type={createOrderMutation.status} orderId={orderId} /> : null}

    </div>);
}

export default Page;