"use client";

import Dropdown from "@/app/components/inputs/Dropdown";
import Spinner from "@/app/components/inputs/Spinner";
import TextInput from "@/app/components/inputs/TextInput";
import { IProduct } from "@/app/model/IProduct";
import { ProductCategory } from "@/app/model/Product";
import { useAddProduct } from "@/hooks/mutations/useAddProductMutation";
import { removeDocument, updateDocument } from "@/hooks/query/firebaseTools";
import { useGetProducts } from "@/hooks/query/useGetProducts";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { IoMdTrash } from "react-icons/io";
import Modal from 'react-modal';
import "./modal.scss";
import "./table.scss";

const Page = () => {
  const [fetchedProducts, setFetchedProducts] = useState<IProduct[]>([]);
  const productsQuery = useGetProducts();
  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.Keyboard);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [internalName, setInternalName] = useState<string>("");
  const [addOnSale, setAddOnSale] = useState<boolean>(false);
  const [addSalePrice, setAddSalePrice] = useState<number>(0);
  const [addSoldOut, setAddSoldOut] = useState<boolean>(false);
  const addProductMutation = useAddProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<string>("");
  const [editCategory, setEditCategory] = useState<ProductCategory>(ProductCategory.Keyboard);
  const [editName, setEditName] = useState<string>("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editImage, setEditImage] = useState<string>("");
  const [editInternalName, setEditInternalName] = useState<string>("");
  const [editOnSale, setEditOnSale] = useState<boolean>(false);
  const [editSalePrice, setEditSalePrice] = useState<number>(0);
  const [editSoldOut, setEditSoldOut] = useState<boolean>(false);
  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);

  const canSubmitEditForm = useMemo(() => {
    const base =
      editProductId !== "" &&
      editName !== "" &&
      editPrice > 0 &&
      editDescription !== "" &&
      editImage !== "" &&
      editInternalName !== "";
    if (!base) return false;
    if (editOnSale) {
      return editSalePrice > 0 && editSalePrice < editPrice;
    }
    return true;
  }, [editProductId, editName, editPrice, editDescription, editImage, editInternalName, editOnSale, editSalePrice]);

  useEffect(() => {
    if (!editProductId) return;
    const p = fetchedProducts.find((x) => x.id === editProductId);
    if (p) {
      setEditName(p.title);
      setEditPrice(p.price);
      setEditDescription(p.description);
      setEditImage(p.image);
      setEditCategory(p.category);
      setEditInternalName(p.internalName ?? "");
      setEditOnSale(Boolean(p.onSale));
      setEditSalePrice(p.salePrice ?? 0);
      setEditSoldOut(Boolean(p.soldOut));
    }
  }, [editProductId, fetchedProducts]);

  const resetEditForm = () => {
    setEditProductId("");
    setEditName("");
    setEditPrice(0);
    setEditDescription("");
    setEditImage("");
    setEditInternalName("");
    setEditOnSale(false);
    setEditSalePrice(0);
    setEditSoldOut(false);
    setEditCategory(ProductCategory.Keyboard);
    setEditIsLoading(false);
    setEditModalOpen(false);
  };

  Modal.setAppElement('.mainbody');

  const modalStyles = {
    content: {
      backgroundColor: "rgba(17, 17, 20, 0.95)",
      border: "#ff2e88 2px solid",
      color: "#fff",
      borderRadius: "0.75rem",
      width: '500px',
      height: 'fit-content',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  }
  console.log(fetchedProducts);
  useEffect(() => {
    if (productsQuery.data) {
      setFetchedProducts(productsQuery.data);
    }
  }, [productsQuery]);
  const canSubmitAddForm = useMemo(() => {
    const base = name !== "" && price > 0 && description !== "" && image !== "" && internalName !== "";
    if (!base) return false;
    if (addOnSale) {
      return addSalePrice > 0 && addSalePrice < price;
    }
    return true;
  }, [name, price, description, image, internalName, addOnSale, addSalePrice]);

  const resetAddForm = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setImage("");
    setInternalName("");
    setAddOnSale(false);
    setAddSalePrice(0);
    setAddSoldOut(false);
    setCategory(ProductCategory.Keyboard);
    setAddFormVisible(false);
  };

  const handleAddProduct = () => {
    if (!canSubmitAddForm) {
      toast("Uzupełnij wszystkie pola przed dodaniem przedmiotu", { icon: "⚠️" });
      return;
    }
    const data = {
      title: name,
      price: price,
      description: description,
      image: image,
      category: category,
      internalName: internalName,
      onSale: addOnSale,
      salePrice: addOnSale ? addSalePrice : undefined,
      soldOut: addSoldOut,
      rating: {
        count: 0,
        rate: 0
      }
    }
    void addProductMutation.mutateAsync(data).then((res) => {
      if (res === false) {
        toast("Podczas dodawania przedmiotu wystąpił błąd", { icon: "⚠️" });
        return;
      }
      toast("Przedmiot został dodany", { icon: "✅" });
      setName("");
      setPrice(0);
      setDescription("");
      setImage("");
      setInternalName("");
      setAddOnSale(false);
      setAddFormVisible(false);
      productsQuery.refetch();
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
      {productsQuery.isLoading ? <Spinner size={30} /> : null}
      {fetchedProducts && <div className="table-wrapper"><table className="items-table">
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Nazwa wewnętrzna</th>
            <th>Opis</th>
            <th>Kategoria</th>
            <th>Promocja</th>
            <th>Wyprzedane</th>
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
              <td><span className={`badge ${item.onSale ? 'sale' : 'no-sale'}`}>{item.onSale ? 'TAK' : 'NIE'}</span></td>
              <td><span className={`badge ${item.soldOut ? 'sold' : 'available'}`}>{item.soldOut ? 'TAK' : 'NIE'}</span></td>
              <td>
                {item.onSale && item.salePrice ? (
                  <>
                    <span className="strike">{item.price} zł</span>
                    <span className="sale-price">{item.salePrice} zł</span>
                  </>
                ) : (
                  <span>{item.price} zł</span>
                )}
              </td>
              <td>
                <div className="buttons">
                  <button className="edit" onClick={() => { setEditProductId(item.id); setEditModalOpen(true); }}>
                    <BiEdit size={20} />
                  </button>
                  <button className="delete" disabled={deletingId === item.id} onClick={async () => {
                    setDeletingId(item.id);
                    try {
                      await removeDocument("products", String(item.id));
                      productsQuery.refetch();
                      toast("Przedmiot został usunięty", { icon: "✅" });
                    } catch {
                      toast("Podczas usuwania przedmiotu wystąpił błąd", { icon: "⚠️" });
                    } finally {
                      setDeletingId(null);
                    }
                  }}>{deletingId === item.id ? <Spinner /> : <IoMdTrash size={20} />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>}
      <Modal style={modalStyles} isOpen={addFormVisible}>
        <div className="add-product-form">
          <h1>Dodawanie nowego przedmiotu</h1>
          <TextInput disabled={addProductMutation.isPending} onChange={(v) => {
            setName(v);
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

          <div className="field-toggle">
            <label className="toggle-label">
              <input type="checkbox" checked={addOnSale} onChange={(e) => setAddOnSale(e.target.checked)} disabled={addProductMutation.isPending} />
              <span className="switch" aria-hidden="true"></span>
              <span className="toggle-text">Promocja</span>
            </label>
          </div>

          {addOnSale && (
            <div className="sale-input">
              <TextInput
                disabled={addProductMutation.isPending}
                onChange={(v) => setAddSalePrice(Number(v))}
                label="Cena promocyjna"
                placeholder="Obniżona cena"
                value={addSalePrice ? String(addSalePrice) : ""}
              />
              <div className="helper">Podaj cenę niższą od ceny podstawowej</div>
            </div>
          )}

          <div className="field-toggle">
            <label className="toggle-label">
              <input type="checkbox" checked={addSoldOut} onChange={(e) => setAddSoldOut(e.target.checked)} disabled={addProductMutation.isPending} />
              <span className="switch" aria-hidden="true"></span>
              <span className="toggle-text">Wyprzedane</span>
            </label>
          </div>

          <div className="buttons">
            <button className={addProductMutation.isPending || !canSubmitAddForm ? "disabled" : "enabled"} disabled={addProductMutation.isPending || !canSubmitAddForm} onClick={() => handleAddProduct()}>
              {addProductMutation.isPending ? <Spinner size={20} /> : "Dodaj"}
            </button>
            <button onClick={() => resetAddForm()}>Anuluj</button>
          </div>
        </div>
      </Modal>
      <Modal style={modalStyles} isOpen={editModalOpen}>
        <div className="edit-product-form">
          <h1>Edytuj przedmiot</h1>
          <Dropdown
            label="Wybierz przedmiot do edycji"
            value={editProductId ?? ""}
            onChange={(v: string) => setEditProductId(v)}
            options={[
              { value: "", label: "— Wybierz —" },
              ...fetchedProducts.map((p) => ({ value: p.id, label: `${p.title} (${p.id})` })),
            ]}
          />

          {!editProductId ? (
            <div className="empty-selection">Wybierz przedmiot z listy powyżej, aby załadować dane.</div>
          ) : (
            <>
              <TextInput
                label="Nazwa"
                placeholder="Nazwa przedmiotu"
                value={editName}
                onChange={(v) => {
                  setEditName(v);
                  setEditInternalName(v.toLocaleLowerCase().replace(" ", "_"));
                }}
                disabled={editIsLoading}
              />
              <TextInput
                label="Cena"
                placeholder="Cena przedmiotu"
                value={String(editPrice)}
                onChange={(v) => setEditPrice(Number(v))}
                disabled={editIsLoading}
              />
              <TextInput
                label="Opis"
                placeholder="Opis przedmiotu"
                value={editDescription}
                onChange={(v) => setEditDescription(v)}
                disabled={editIsLoading}
              />
              <Dropdown
                label="Kategoria"
                options={[
                  { value: "keyboard", label: "Klawiatura" },
                  { value: "mouse", label: "Mysz" },
                  { value: "mousepad", label: "Podkładka" },
                  { value: "microphone", label: "Mikrofon" },
                  { value: "accessories", label: "Akcesoria" },
                ]}
                value={editCategory}
                onChange={(v: ProductCategory) => setEditCategory(v)}
              />
              <TextInput
                label="Zdjęcie (URL)"
                placeholder="URL zdjęcia przedmiotu"
                value={editImage}
                onChange={(v) => setEditImage(v)}
                disabled={editIsLoading}
              />

              <div className="field-toggle">
                <label className="toggle-label">
                  <input type="checkbox" checked={editOnSale} onChange={(e) => setEditOnSale(e.target.checked)} disabled={editIsLoading} />
                  <span className="switch" aria-hidden="true"></span>
                  <span className="toggle-text">Promocja</span>
                </label>
              </div>

              {editOnSale && (
                <div className="sale-input">
                  <TextInput
                    label="Cena promocyjna"
                    placeholder="Obniżona cena"
                    value={editSalePrice ? String(editSalePrice) : ""}
                    onChange={(v) => setEditSalePrice(Number(v))}
                    disabled={editIsLoading}
                  />
                  <div className="helper">Cena promocyjna musi być mniejsza niż cena podstawowa</div>
                </div>
              )}

              <div className="field-toggle">
                <label className="toggle-label">
                  <input type="checkbox" checked={editSoldOut} onChange={(e) => setEditSoldOut(e.target.checked)} disabled={editIsLoading} />
                  <span className="switch" aria-hidden="true"></span>
                  <span className="toggle-text">Wyprzedane</span>
                </label>
              </div>

              <TextInput
                label="Nazwa wewnętrzna"
                placeholder="internal_name"
                value={editInternalName}
                onChange={(v) => setEditInternalName(v)}
                disabled={editIsLoading}
              />

              <div className="buttons">
                <button
                  className={editIsLoading || !canSubmitEditForm ? "disabled" : "enabled"}
                  disabled={editIsLoading || !canSubmitEditForm}
                  onClick={async () => {
                    if (!editProductId) return;
                    setEditIsLoading(true);
                    const payload = {
                      title: editName,
                      price: editPrice,
                      description: editDescription,
                      image: editImage,
                      category: editCategory,
                      internalName: editInternalName,
                      onSale: editOnSale,
                      salePrice: editOnSale ? editSalePrice : undefined,
                      soldOut: editSoldOut,
                    };
                    try {
                      updateDocument("products", editProductId, payload).then(() => {
                        toast("Przedmiot został zaktualizowany", { icon: "✅" });
                        productsQuery.refetch();
                        resetEditForm();
                      });
                    } catch (e) {
                      toast("Podczas aktualizacji przedmiotu wystąpił błąd", { icon: "⚠️" });
                    } finally {
                      setEditIsLoading(false);
                    }
                  }}
                >
                  {editIsLoading ? <Spinner size={20} /> : "Zapisz zmiany"}
                </button>
                <button
                  onClick={() => {
                    resetEditForm();
                  }}
                  disabled={editIsLoading}
                >
                  Anuluj
                </button>
              </div>
            </>
          )}

          <style jsx>{`
                .empty-selection {
                  color: var(--muted, #9aa0a6);
                  margin: 1rem 0;
                }
              `}</style>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
