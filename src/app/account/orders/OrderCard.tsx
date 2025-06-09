import { Order } from "@/app/model/Order";
import "./orderCard.scss";
import IconButton from "@/app/components/inputs/IconButton";
import { FaArrowRight } from "react-icons/fa";
import { translateStatus } from "@/app/tools/Tools";

interface OrderCardProps {
    order: Order
    onSelect: (order: Order) => void
}
const OrderCard: React.FC<OrderCardProps> = ({ order, onSelect }) => {
    return (
        <div className="order-card">
            <div className="order-card_info">
                <h3>Id zamówienia: {order.id}</h3>
                <h3>Data zamówienia: {order.orderDate.toLocaleDateString()} {order.orderDate.toLocaleTimeString()}</h3>
                <h3>Status: <span style={{ color: order.status === "paid" ? "lightgreen" : order.status === "cancelled" ? "red" : "white" }}>{translateStatus(order.status)}</span> </h3>
                <h3>Ilość przedmiotów: {order.products.length}</h3>
                <h3>Suma: {order.total} zł</h3>
            </div>
            <IconButton Icon={FaArrowRight} size={30} onClick={() => { onSelect(order) }} />
        </div>
    );
}

export default OrderCard;