"use client";

import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    return (<div>
        Zamówienie o podanym id nie istnieje <br />
        <button onClick={() => router.push("/account/orders")}>Wróć do listy zamówień</button>
    </div>);
}

export default Page;