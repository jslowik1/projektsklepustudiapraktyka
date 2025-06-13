/* eslint-disable @typescript-eslint/no-explicit-any */
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
import "../admin/products/table.scss"
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
    console.log(selectedOrder);

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
                    <div>
                        <h2 className="order-title">Zamówienie {selectedOrder.id}</h2>
                        <p className="order-status">
                            Status: <span>{translateStatus(selectedOrder.status)}</span>
                        </p>
                        <p className="order-date">Data: {selectedOrder.orderDate.toLocaleDateString()}</p>

                        <div className="address-block">
                            <h3>Adres dostawy</h3>
                            <p>Ulica: {selectedOrder.shippingAddress.street}</p>
                            <p>Miasto: {selectedOrder.shippingAddress.city}</p>
                            <p>Kod pocztowy: {selectedOrder.shippingAddress.zipCode}</p>
                        </div>
                    </div>

                    <table className="items-table">
                        <thead className="table-header">
                            <tr>
                                <th>Produkt</th>
                                <th>Ilość</th>
                                <th>Cena</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {selectedOrder.products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{(product as any).quantity}</td>
                                    <td>{product.price * (product as any).quantity} zł</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2}>Suma:</td>
                                <td>{selectedOrder.total} zł</td>
                            </tr>
                        </tbody>
                    </table>

                </div>}
            </div>
        </div>
    );
}

export default Page;