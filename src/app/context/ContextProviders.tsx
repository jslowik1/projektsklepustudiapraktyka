import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider><CartProvider>{children}</ CartProvider></AuthProvider>;
};
