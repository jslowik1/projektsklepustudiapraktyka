/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/account/admin/users");
    }, [])
    return (<></>);
}

export default Page;