import { IProduct } from "./IProduct";

export type OrderStatus = "shipped" | "delivered" | "new" | "cancelled" | "refunded" | "paid";

export interface Order {
    id?: string;
    user: string;
    products: IProduct[];
    orderDate: Date;
    shippingAddress: ShippingAddress
    total: string;
    status: OrderStatus
}

export interface ShippingAddress {
    street: string;
    city: string;
    zipCode: string;
    country: string;
}