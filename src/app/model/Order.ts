import { ProductCategory } from "./Product";

export type OrderStatus = "shipped" | "delivered" | "new" | "cancelled" | "refunded" | "paid";

export interface Order {
    id?: string;
    user: string;
    products: ProductCategory[];
    orderDate: Date;
    shippingAddress: ShippingAddress
    total: string;
    status: OrderStatus
}

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}