"use client"
import { useAuth } from "@/app/context/AuthProvider";
import { Order } from "@/app/model/Order";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const Page = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const getItems = async () => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const ordersRef = collection(db, "orders");
                const q = query(ordersRef, where("user", "==", userRef));
                const querySnapshot = await getDocs(q);
                const userSnap = await getDoc(userRef);
                if (userSnap.data() === undefined) return
                const orders: Order[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const newUser = userSnap.data();

                    return {
                        id: doc.id,
                        user: newUser?.displayName ?? "",
                        products: data.products,
                        orderDate: new Timestamp(data.orderDate.seconds, data.orderDate.nanoseconds).toDate(),
                        shippingAddress: data.shippingAddress
                    }
                });

                setOrders(orders);
            }
        }
        void getItems()

    }, [user]);
    return (
        <div className="account-inside">
            <h1>Orders</h1>
            {orders && orders.map(order => <OrderCard order={order} key={order.id} />)}
        </div>);
}

export default Page;