/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCollection } from "../query/firebaseTools";


export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<
        boolean,
        Error,
        any,
        unknown
    >({
        mutationFn: async (product: any) => {
            return await addItemToCollection("products", product).then(() => true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};
