/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "@/app/model/IProduct";
import { useQuery } from "@tanstack/react-query";
import { getAllItemsFromCollection } from "./firebaseTools";

const mapDataToProduct = (data: { id: string; data: any }[]): IProduct[] => {
    return data.map((item) => {
        return {
            id: item.id,
            internalName: item.data.internalName,
            title: item.data.title,
            price: item.data.price,
            description: item.data.description,
            category: item.data.category,
            image: item.data.image,
            rating: item.data.rating,
            onSale: item.data.onSale ?? false,
            salePrice: item.data.salePrice ?? 0,
            soldOut: item.data.soldOut ?? false
        };
    });
}
const fetchProducts = async (): Promise<IProduct[]> => {
    const data = await getAllItemsFromCollection("products");

    return mapDataToProduct(data);
};

export const useGetProducts = () => {
    return useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
        enabled: true
    });
};
