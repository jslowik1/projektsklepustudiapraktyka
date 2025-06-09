"use client"
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return <AuthProvider>
        <CartProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ CartProvider>
    </AuthProvider>;
};
