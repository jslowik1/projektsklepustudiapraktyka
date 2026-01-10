/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "@/app/model/Order";
import { useQuery } from "@tanstack/react-query";
import { getAllOrdersAsAdmin } from "./firebaseTools";

const mapDataToOrder = (data: { id: string; data: any }[]): Order[] => {
    return data.map((item) => {
        return {
            id: item.id,
            user: item.data.user,
            products: item.data.products,
            orderDate: item.data.orderDate.toDate(),
            shippingAddress: item.data.shippingAddress,
            total: item.data.total,
            status: item.data.status
        };
    });
}
const fetchProducts = async (): Promise<Order[]> => {
    const data = await getAllOrdersAsAdmin();
    return mapDataToOrder(data);
};

export const useGetAllAdminOrdersQuery = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => fetchProducts(),
        enabled: true
    });
};
