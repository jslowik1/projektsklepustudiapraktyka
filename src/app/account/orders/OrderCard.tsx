import { Order } from "@/app/model/Order";
import Link from "next/link";

interface OrderCardProps {
    order: Order
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    console.log(order.orderDate);
    return (
        <div>
            <h3>Id zamówienia: {order.id}</h3>
            <h3>Data zamówienia: {order.orderDate.toLocaleDateString()} {order.orderDate.toLocaleTimeString()}</h3>
            <h3>Ilość przedmiotów: {order.products.length}</h3>
            <Link href={`/account/orders/${order.id}`}>Zobacz szczegóły</Link>
        </div>
    );
}

export default OrderCard;