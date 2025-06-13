import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, doc, DocumentReference, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { ICartItem } from "@/app/context/CartProvider";
import { UserAddress } from "@/app/model/User";

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

            const order = {
                user: userRef,
                products: cart,
                orderDate: new Date(),
                shippingAddress,
                total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
                status: "paid",
            };

            return addDoc(collection(db, "orders"), order);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userOrders"] });
        },
    });
};
