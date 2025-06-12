import Spinner from "@/app/components/inputs/Spinner";
import { IProduct } from "@/app/model/IProduct";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";

interface IProductListItem {
    handleRemove: (id: string) => Promise<void>
    item: IProduct
}

const ProductListItem: React.FC<IProductListItem> = ({ item, handleRemove }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    return (<div className="product" key={item.id}>
        <div className="product-info">
            <p>ID: {item.id}</p>
            <p>Cena: {item.price} zł</p>
            <p>Nazwa wewnętrzna: {item.internalName}</p>
            <p>Nazwa: {item.title}</p>
            <p>Opis: {item.description}</p>
            <p>Kategoria: {item.category}</p>
        </div>
        <div className="buttons">
            <button>{<BiEdit size={20} />}
            </button>
            <button onClick={async () => {
                setIsLoading(true)
                await handleRemove(item.id)
                    .then(() => setIsLoading(false))
                    .catch(() => setIsLoading(false))
            }}>{isLoading ? <Spinner /> : <IoMdTrash size={20} />}
            </button>
        </div>
    </div>);
}

export default ProductListItem;