import { ICartItem } from "@/app/context/CartProvider";
import { UserAddress } from "@/app/model/User";
import { db } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, DocumentReference } from "firebase/firestore";

interface OrderInput {
    user: User;
    cart: ICartItem[];
    shippingAddress: UserAddress;
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<
        DocumentReference<DocumentData>,
        Error,
        OrderInput,
        unknown
    >({
        mutationFn: async ({ user, cart, shippingAddress }: OrderInput) => {
            const userRef = doc(db, "users", user.uid);

            const productsForOrder = cart.map((item) => {
                const unitPrice = item.onSale && item.salePrice ? item.salePrice : item.price;
                const lineTotal = Math.round(unitPrice * item.quantity * 100) / 100;
                console.log(unitPrice);
                return {
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    unitPrice,
                    lineTotal,
                    image: item.image,
                };
            });

            const totalNumber = Math.round(productsForOrder.reduce((acc, p) => acc + p.lineTotal, 0) * 100) / 100;

            const order = {
                user: userRef,
                products: productsForOrder,
                orderDate: new Date(),
                shippingAddress,
                total: totalNumber,
                status: "paid",
            };

            return addDoc(collection(db, "orders"), order);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userOrders"] });
        },
    });
};
