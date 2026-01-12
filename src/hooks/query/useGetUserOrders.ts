import { Order } from "@/app/model/Order";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    where
} from "firebase/firestore";

const fetchUserOrders = async (user: User): Promise<Order[]> => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);


    if (!userSnap.exists()) {
        throw new Error("Użytkownik nie istnieje");
    }

    const userData = userSnap.data();
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("user", "==", userRef));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            user: userData?.displayName ?? "",
            products: data.products,
            orderDate: new Timestamp(
                data.orderDate.seconds,
                data.orderDate.nanoseconds
            ).toDate(),
            shippingAddress: data.shippingAddress,
            total: data.total,
            status: data.status
        };
    });
};

export const useGetUserOrders = (user: User | null) => {
    return useQuery<Order[]>({
        queryKey: ["userOrders", user?.uid],
        queryFn: () => fetchUserOrders(user!),
        enabled: !!user
    });
};
