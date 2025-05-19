"use client";
import Dropdown from "@/app/components/inputs/Dropdown";
import TextInput from "@/app/components/inputs/TextInput";
import ProductCard from "@/app/components/productCards/ProductCard";
import { IProduct } from "@/app/model/IProduct";
import { Product } from "@/app/model/Product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { category } = useParams<{ category: string }>();
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");

  const products: IProduct[] = [
    {
      id: 2,
      internalName: "keychronV2",
      title: "Keychron V2",
      price: 750,
      description: "Klawiatura",
      image: "",
      category: Product.Keyboard,
      rating: {
        rate: 5,
        count: 1,
      },
    },
    {
      id: 3,
      internalName: "keychronV2",
      title: "Keychron V2",
      price: 750,
      description: "Klawiatura",
      image: "",
      category: Product.Keyboard,
      rating: {
        rate: 5,
        count: 1,
      },
    },
    {
      id: 1,
      internalName: "keychronV1",
      title: "Keychron V1",
      price: 450,
      description: "Klawiatura",
      image: "",
      category: Product.Keyboard,
      rating: {
        rate: 5,
        count: 1,
      },
    },
    {
      id: 4,
      internalName: "keychronV2",
      title: "Keychron V2",
      price: 750,
      description: "Klawiatura",
      image: "",
      category: Product.Keyboard,
      rating: {
        rate: 5,
        count: 1,
      },
    },
    {
      id: 5,
      internalName: "keychronMouse",
      title: "Keychron Mouse",
      price: 350,
      description: "Myszka",
      image: "",
      category: Product.Mouse,
      rating: {
        rate: 5,
        count: 1,
      },
    },
  ];

  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  useEffect(() => {
    const filteredProductsNew = products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "asc") return a.price - b.price;
        else if (sort === "desc") return b.price - a.price;
        else return 0;
      })
      .filter((item) => item.category === category);
    setFilteredProducts(filteredProductsNew);
  }, [sort, search]);

  useEffect(() => {
    setFilteredProducts(
      filteredProducts.filter((item) => item.category === category)
    );
  }, [category]);

  return (
    <>
      <div className="product-list_filters">
        <div className="product-list_filters-title">
          {category === Product.Keyboard
            ? "Klawiatury"
            : category === Product.Mouse
            ? "Myszki"
            : category === Product.Mousepad
            ? "Podkładki"
            : category === Product.Microphone
            ? "Mikrofony"
            : "Akcesoria"}
        </div>
        <div>
          <div className="product-list_filters-item">
            <TextInput onChange={setSearch} label="Szukaj" />
          </div>
        </div>
        <div>
          <div className="product-list_filters-item">
            <Dropdown
              label="Sortuj"
              options={[
                { value: "asc", label: "Cena rosnąco" },
                { value: "desc", label: "Cena malejąco" },
              ]}
              onChange={(e) => {
                setSort(e);
              }}
              value={sort}
            />
          </div>
        </div>
      </div>
      <div className="product-list_content">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Page;
