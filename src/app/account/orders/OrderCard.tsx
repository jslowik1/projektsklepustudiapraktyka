import IconButton from "@/app/components/inputs/IconButton";
import { Order } from "@/app/model/Order";
import { translateStatus } from "@/app/tools/Tools";
import { FaArrowRight } from "react-icons/fa";
import "./orderCard.scss";

interface OrderCardProps {
    order: Order
    onSelect: (order: Order) => void
}
const OrderCard: React.FC<OrderCardProps> = ({ order, onSelect }) => {
    const statusClass = order.status === 'paid' ? 'paid' : order.status === 'cancelled' ? 'cancelled' : order.status === 'delivered' ? 'delivered' : order.status === 'shipped' ? 'shipped' : order.status === 'refunded' ? 'refunded' : 'new';
    const totalItems = order.products.reduce((acc, p) => acc + (p.quantity ?? 0), 0);

    return (
        <div className="order-card" role="button" tabIndex={0} onClick={() => onSelect(order)} onKeyDown={(e) => { if (e.key === 'Enter') onSelect(order); }}>
            <div className="order-card_info">
                <div className="row">
                    <div className="left">
                        <div className="order-id">Zamówienie <strong>#{order.id}</strong></div>
                        <div className="order-date">{order.orderDate.toLocaleDateString()} · {order.orderDate.toLocaleTimeString()}</div>
                    </div>
                    <div className="right">
                        <div className={`status ${statusClass}`}>{translateStatus(order.status)}</div>
                        <div className="total">{order.total.toFixed ? order.total.toFixed(2) : order.total} zł</div>
                    </div>
                </div>

                <div className="meta">
                    <div>Ilość produktów: <strong>{totalItems}</strong></div>
                </div>
            </div>
            <div className="order-card_action">
                <IconButton Icon={FaArrowRight} size={18} onClick={() => { onSelect(order) }} />
            </div>
        </div>
    );
}

export default OrderCard;