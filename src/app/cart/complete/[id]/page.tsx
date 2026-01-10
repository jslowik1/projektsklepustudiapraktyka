"use client"
import { useParams } from "next/navigation";
import OrderInfo from "./OrderInfo";
import "./payment.scss";

const Page = () => {
    const { id } = useParams<{ id: string }>();
    return (<div className="payment">
        <OrderInfo type={"success"} orderId={id} />

    </div>);
}

export default Page;