import Link from "next/link";
import { BiCheck, BiError } from "react-icons/bi";

interface OrderInfoProps {
    type: "error" | "idle" | "pending" | "success";
    orderId?: string;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ type, orderId }) => {

    return <div className="order-info">
        {type === "success" ?
            <>
                <BiCheck color="lightgreen" size={70} />
                <h2>Dziękujemy za złożenie zamówienia</h2>
                <span>Id zamówienia: {orderId}</span>
                <Link href="/account/orders">Moje zamówienia</Link>
            </> :
            <>
                <BiError size={70} color="crimson" />
                <h2>Wystąpił błąd przy składaniu zamówienia</h2>
            </>
        }

    </div>

}

export default OrderInfo;