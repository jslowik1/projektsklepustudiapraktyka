"use client"
import { useAuth } from "@/app/context/AuthProvider";
import { useCart } from "@/app/context/CartProvider";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Page = () => {
    const { cart } = useCart();
    const { user, userData } = useAuth();
    const [order, setOrder] = useState<any>();
    const handleOrder = () => {
        if (order)
            void addDoc(collection(db, "orders"), order);
    }

    useEffect(() => {
        if (user && cart && userData) {
            const userRef = doc(db, "users", user.uid);
            setOrder({
                user: userRef,
                products: cart.map(item => {
                    return { id: item.id, quantity: item.quantity }
                }),
                orderDate: new Date(),
                shippingAddress: userData?.address
            })
        }


    }, [cart, user, userData]);

    return (<div>
        <button onClick={() => handleOrder()}>Zaplac</button>
    </div>);
}

export default Page;