import { Product } from "./Product";

export interface Order {
    id?: string;
    user: string;
    products: Product[];
    orderDate: Date;
    shippingAddress: ShippingAddress
}

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}