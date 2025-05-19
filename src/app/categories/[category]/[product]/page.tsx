"use client"
import { useParams } from "next/navigation";

const Page = () => {
    const { product } = useParams<{ product: string }>();

    return (<p>{product}</p>);
}

export default Page;