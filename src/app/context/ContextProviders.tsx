import { CartProvider } from "./CartProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <CartProvider>{children}</CartProvider>;
};
