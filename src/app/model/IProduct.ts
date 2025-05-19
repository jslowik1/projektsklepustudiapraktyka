import { Product } from "./Product";

export interface IProduct {
  id: number;
  internalName: string;
  title: string;
  price: number;
  description: string;
  category: Product;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
