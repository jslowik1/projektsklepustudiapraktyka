"use client";

import { IProduct } from "@/app/model/IProduct";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import Spinner from "@/app/components/inputs/Spinner";
import { useGetProducts } from "@/hooks/query/useGetProducts";
import TextInput from "@/app/components/inputs/TextInput";
import Dropdown from "@/app/components/inputs/Dropdown";
import { useAddProduct } from "@/hooks/mutations/useAddProductMutation";
import { ProductCategory } from "@/app/model/Product";
import toast from "react-hot-toast";
import "./table.scss";
import { BiEdit } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import { removeDocument } from "@/hooks/query/firebaseTools";
import { products } from "@/app/assets/products";
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    void addProductMutation.mutateAsync(data).then((res) => {
      if (res === false) {
        toast("Podczas dodawania przedmiotu wystąpił bład", { icon: "⚠️" });
        return;
      }
      toast("Przedmiot został dodany", { icon: "✅" });
      setAddFormVisible(false);
    })
  }

  const addAllItems = () => {
    products.forEach((item) => {
      const data = {
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        internalName: item.internalName,
        rating: {
          count: item.rating.count,
          rate: item.rating.rate
        }
      }
      void addProductMutation.mutateAsync(data).then((res) => {
        if (res === false) {
          toast("Podczas dodawania przedmiotu wystąpił bład", { icon: "⚠️" });
          return;
        }
        toast("Przedmiot został dodany", { icon: "✅" });
      })
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
          ? <table className="items-table">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Nazwa wewnętrzna</th>
                <th>Opis</th>
                <th>Kategoria</th>
                <th>Cena</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {fetchedProducts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.internalName}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.price} zł</td>
                  <td>
                    <div className="buttons">
                      <button className="disabled" disabled>{<BiEdit size={20} />}
                      </button>
                      <button onClick={async () => {
                        setIsLoading(true)
                        await removeDocument("products", String(item.id))
                          .then(() => setIsLoading(false))
                          .catch(() => setIsLoading(false))
                      }}>{isLoading ? <Spinner /> : <IoMdTrash size={20} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          : addFormVisible === true ?
            <div>
              <h1>Dodawanie nowego przedmiotu</h1>
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => {
                setTitle(v);
                setInternalName(v.toLocaleLowerCase().replace(" ", "_"));
              }} label="Nazwa" placeholder="Nazwa przedmiotu" />
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => setPrice(Number(v))} label="Cena" placeholder="Cena przedmiotu" />
              <TextInput disabled={addProductMutation.isPending} onChange={(v) => setDescription(v)} label="Opis" placeholder="Opis przedmiotu" />
              <Dropdown onChange={(v) => setCategory(v)} label="Kategoria" options={[
                { value: "keyboard", label: "Klawiatura" },
                { value: "mouse", label: "Mysz" },
                { value: "mousepad", label: "Podkładka" },
                { value: "microphone", label: "Mikrofon" },
                { value: "accessories", label: "Akcesoria" }
              ]} value={category} />
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
      {/* <button onClick={() => addAllItems()}>Dodaj</button> */}
    </div>
  );
};

export default Page;
