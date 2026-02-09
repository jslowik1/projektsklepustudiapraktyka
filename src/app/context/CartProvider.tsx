"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";

export interface ICartItem extends IProduct {
    quantity: number;
}

interface CartContextType {
    cart: ICartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ICartItem[]>([]);
    const STORAGE_KEY = "shopping_cart";
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setCart(JSON.parse(stored));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    //Funkcja do dodawania produktu do koszyka
    const addToCart = (product: IProduct) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    //Funkcja do usuwania produktu z koszyka
    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    //Funkcja do czyszczenia koszyka
    const clearCart = () => { setCart([]) };

    // Funkcja do aktualizacji ilości produktu w koszyku
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) return; // Zapobiega ustawianiu ilości < 1
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? { ...item, quantity } // Zaktualizuj ilość produktu
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
