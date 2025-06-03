"use client"

import { IProduct } from "@/app/model/IProduct";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import ProductListItem from "./ProductListItem";
const Page = () => {
    const [fetchedProducts, setFetchedProducts] = useState<IProduct[]>([]);
    async function fetchItems() {
        const res = await fetch("/api/items");
        const data = await res.json();
        setFetchedProducts(data);
    }
    useEffect(() => {
        fetchItems();
    }, []);
    const handleRemove = async (id: number): Promise<void> => {
        void fetch(`/api/items/${id}`, { method: "DELETE" })
            .then(() => fetchItems())
            .catch((e) => { throw new Error(e) });
    }

    return (<div className="products">

        <div className="buttons">
            <button><CgAdd size={20} />Dodaj przedmiot</ button>
        </div>
        <div>
            {fetchedProducts ? fetchedProducts.map((item) => (
                <ProductListItem item={item} key={item.id} handleRemove={handleRemove} />)
            ) : ""}
        </div>
    </div>
    );
}

export default Page;