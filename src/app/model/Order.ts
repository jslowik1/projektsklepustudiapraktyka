/* eslint-disable @typescript-eslint/no-explicit-any */
export type OrderStatus = "shipped" | "delivered" | "new" | "cancelled" | "refunded" | "paid";

export interface OrderProduct {
    id: string;
    title: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    image?: string;
}

export type OrderUser = { id: string; name?: string; email?: string; [key: string]: any };

export interface Order {
    id?: string;
    user: OrderUser;
    products: OrderProduct[];
    orderDate: Date;
    shippingAddress: ShippingAddress
    total: number;
    status: OrderStatus
}

export interface ShippingAddress {
    street: string;
    city: string;
    zipCode: string;
    country: string;
}