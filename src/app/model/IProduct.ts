import { ProductCategory } from "./Product";

export interface IProduct {
  id: string;
  internalName: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  onSale?: boolean;
  salePrice?: number;
  soldOut?: boolean;
}
