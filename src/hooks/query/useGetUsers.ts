/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<any[]> => {
    const res = await fetch("/api/users");
    return await res.json();
};

export const useGetUsers = () => {
    return useQuery<any[]>({
        queryKey: ["users"],
        queryFn: () => fetchUsers(),
        enabled: true
    });
};
