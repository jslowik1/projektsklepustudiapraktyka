"use client";

import { IProduct } from "@/app/model/IProduct";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import ProductListItem from "./ProductListItem";
import Spinner from "@/app/components/inputs/Spinner";
import { useGetProducts } from "@/hooks/query/useGetProducts";
import { removeDocument } from "@/hooks/query/firebaseTools";
import TextInput from "@/app/components/inputs/TextInput";
import Dropdown from "@/app/components/inputs/Dropdown";
import { useAddProduct } from "@/hooks/mutations/useAddProductMutation";
import { ProductCategory } from "@/app/model/Product";
const Page = () => {
  const [fetchedProducts, setFetchedProducts] = useState<IProduct[]>([]);
  const productsQuery = useGetProducts();
  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.Keyboard);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [internalName, setInternalName] = useState<string>("");
  const addProductMutation = useAddProduct();

  useEffect(() => {
    if (productsQuery.data) {
      setFetchedProducts(productsQuery.data);
    }
  }, [productsQuery]);

  const handleAddProduct = () => {
    const data = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
      internalName: internalName,
      rating: {
        count: 0,
        rate: 0
      }
    }
    void addProductMutation.mutateAsync(data).then(() => {
      setAddFormVisible(false);
    })
  }


  return (
    <div className="products">
      <div className="buttons">
        <button onClick={() => setAddFormVisible(!addFormVisible)}>
          <CgAdd size={20} />
          Dodaj przedmiot
        </button>
      </div>
      <div>
        {productsQuery.isLoading ? <Spinner size={30} /> : null}
        {fetchedProducts && addFormVisible !== true
          ? fetchedProducts.map((item) => (
            <ProductListItem
              item={item}
              key={item.id}
              handleRemove={(id) => removeDocument("products", String(id))}
            />
          ))
          : addFormVisible === true ?
            <div>
              <h1>Dodawanie nowego przedmiotu</h1>
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => {
                setTitle(v);
                setInternalName(v.toLocaleLowerCase().replace(" ", "_"));
              }} label="Nazwa" placeholder="Nazwa przedmiotu" />
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => setPrice(Number(v))} label="Cena" placeholder="Cena przedmiotu" />
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => setDescription(v)} label="Opis" placeholder="Opis przedmiotu" />
              <Dropdown onChange={(v) => setCategory(v)} label="Kategoria" options={[{ value: "keyboard", label: "Klawiatura" }, { value: "mouse", label: "Mysz" }, { value: "mousepad", label: "Podkładka" },]} value={category} />
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => setImage(v)} label="Zdjęcie" placeholder="URL zdjęcia przedmiotu" />
              <div className="buttons">
                <button disabled={addProductMutation.isPending} onClick={() => handleAddProduct()}>
                  {addProductMutation.isPending ? <Spinner size={20} /> : "Dodaj"}
                </button>
                <button onClick={() => setAddFormVisible(false)}>Anuluj</button>
              </div>
            </div> :
            null}
      </div>
    </div>
  );
};

export default Page;
