/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { products } from "@/app/assets/products";
import Dropdown from "@/app/components/inputs/Dropdown";
import Spinner from "@/app/components/inputs/Spinner";
import TextInput from "@/app/components/inputs/TextInput";
import ProductCard from "@/app/components/productCards/ProductCard";
import { IProduct } from "@/app/model/IProduct";
import { translateCategory } from "@/app/tools/Tools";
import { useGetProducts } from "@/hooks/query/useGetProducts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { category } = useParams<{ category: string }>();
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  const productsQuery = useGetProducts();

  const [unfilteredProducts, setUnfilteredProducts] = useState<IProduct[]>(products);

  useEffect(() => {
    if (productsQuery.data) {
      setUnfilteredProducts([...unfilteredProducts, ...productsQuery.data])
    }
  }, [productsQuery.status])


  useEffect(() => {
    console.log(unfilteredProducts);
    const filteredProductsNew = unfilteredProducts
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "asc") return a.price - b.price;
        else if (sort === "desc") return b.price - a.price;
        else if (sort === "rate") return b.rating.rate - a.rating.rate;
        else if (sort === "sale")
          return (b.onSale ? 1 : 0) - (a.onSale ? 1 : 0);
        else return 0;
      })
      .filter((item) => {
        if (category === "sale") {
          return item.onSale === true;
        } else return item.category === category;
      });
    setFilteredProducts(filteredProductsNew);
  }, [sort, search, unfilteredProducts]);

  useEffect(() => {
    setFilteredProducts(
      filteredProducts.filter((item) => {
        if (category === "sale") {
          return item.onSale === true;
        } else return item.category === category;
      })
    );
  }, [category]);

  return (
    <>
      <div className="product-list_filters">
        <div className="product-list_filters-title">
          {translateCategory(category)}
        </div>
        <div>
          <div className="product-list_filters-item">
            <TextInput onChange={setSearch} label="Szukaj" />
          </div>
        </div>
        <div>
          <div className="product-list_filters-item">
            <Dropdown
              label="Sortuj według:"
              options={[
                { value: "asc", label: "Cena rosnąco" },
                { value: "desc", label: "Cena malejąco" },
                { value: "sale", label: "Wyprzedaż" },
                { value: "rate", label: "Ocena" },
              ]}
              onChange={(e) => {
                setSort(e);
              }}
              value={sort}
            />
          </div>
        </div>
      </div>
      <div className="product-list_content" style={productsQuery.isLoading ? { display: "flex", justifyContent: "center" } : undefined}>
        {productsQuery.isLoading ? <Spinner size={50} /> :
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        }
        {filteredProducts.length === 0 ? (
          <span>
            {search !== "" ? "Brak pasujących produktów" : "Brak produktów"}
          </span>
        ) : null}
      </div>
    </>
  );
};

export default Page;
