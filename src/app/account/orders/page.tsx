/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import IconButton from "@/app/components/inputs/IconButton";
import Spinner from "@/app/components/inputs/Spinner";
import { useAuth } from "@/app/context/AuthProvider";
import { Order } from "@/app/model/Order";
import { translateStatus } from "@/app/tools/Tools";
import { useGetUserOrders } from "@/hooks/query/useGetUserOrders";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import "../admin/products/table.scss";
import OrderCard from "./OrderCard";
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
                    {userOrders.isLoading ? <div className="spinner-wrap"><Spinner size={30} /></div> : null}
                    {orders && orders.map(order => <OrderCard onSelect={setSelectedOrder} order={order} key={order.id} />)}
                    {userOrders.isSuccess && orders.length === 0 ? <h2>Nie złożyłeś jeszcze żadnego zamówienia</h2> : null}
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
                                <th>Cena jedn.</th>
                                <th>Razem</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {selectedOrder.products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{(product as any).quantity}</td>
                                    <td>{(product as any).unitPrice.toFixed ? (product as any).unitPrice.toFixed(2) : product.unitPrice} zł</td>
                                    <td>{(product as any).lineTotal.toFixed ? (product as any).lineTotal.toFixed(2) : product.lineTotal} zł</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3}>Suma:</td>
                                <td>{selectedOrder.total.toFixed(2)} zł</td>
                            </tr>
                        </tbody>
                    </table>

                </div>}
            </div>
        </div>
    );
}

export default Page;