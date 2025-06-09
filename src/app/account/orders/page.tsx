"use client"
import { useAuth } from "@/app/context/AuthProvider";
import { Order } from "@/app/model/Order";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useGetUserOrders } from "@/hooks/query/useGetUserOrders";
import Spinner from "@/app/components/inputs/Spinner";
import { translateStatus } from "@/app/tools/Tools";
import IconButton from "@/app/components/inputs/IconButton";
import { GrClose } from "react-icons/gr";

const Page = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const userOrders = useGetUserOrders(user);

    useEffect(() => {
        if (userOrders.data) {
            setOrders(userOrders.data.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime()));
        }
    }, [userOrders.data, userOrders.status])


    return (
        <div className="account-inside orders">

            <h1>Zamówienia</h1>
            <div className="orders-container">
                <div className="orders-list">
                    {userOrders.isLoading ? <Spinner size={30} /> : null}
                    {orders && orders.map(order => <OrderCard onSelect={setSelectedOrder} order={order} key={order.id} />)}
                    {userOrders.isSuccess && orders.length === 0 ? <h2>Nie złóżyłeś jeszcze żadnego zamówienia</h2> : null}
                </div>
                {selectedOrder && <div className="order-info">
                    <IconButton Icon={GrClose} size={30} onClick={() => setSelectedOrder(null)} />
                    <h2>Zamówienie {selectedOrder.id}</h2>
                    <h3>Status zamówienia: {translateStatus(selectedOrder.status)}</h3>
                </div>}
            </div>
        </div>
    );
}

export default Page;