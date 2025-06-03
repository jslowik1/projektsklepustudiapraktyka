import Spinner from "@/app/components/inputs/Spinner";
import { IProduct } from "@/app/model/IProduct";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";

interface IProductListItem {
    handleRemove: (id: number) => Promise<void>
    item: IProduct
}

const ProductListItem: React.FC<IProductListItem> = ({ item, handleRemove }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    return (<div className="product" key={item.id}>
        {item.id}
        <div className="buttons">
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