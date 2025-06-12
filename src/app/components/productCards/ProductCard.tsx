/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { IProduct } from "@/app/model/IProduct";
import IconButton from "../inputs/IconButton";
import { useCart } from "@/app/context/CartProvider";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomRating from "../inputs/Rating";
import toast from 'react-hot-toast';
interface IProductCardProps {
    item: IProduct
}
const ProductCard: React.FC<IProductCardProps> = ({ item }) => {
    const { addToCart, cart, removeFromCart } = useCart();
    const [inCart, setInCart] = useState<boolean>(false);
    const router = useRouter();
    const [image, setImage] = useState<string>();
    const handleAddToCart = () => {
        if (inCart) {
            removeFromCart(item.id);
            toast(`Usunięto ${item.title} z koszyka`);
        }
        else {
            addToCart(item);
            toast(`Dodano ${item.title} do koszyka`);
        };
    }

    useEffect(() => {
        if (item.image && item.image.includes("https")) {
            setImage(item.image);
            return;
        }
        if (item.image && !image) {
            const img = import("../../assets/images/" + item.image).then(v => v).catch(() => { return "" })
            Promise.all([
                img
            ]).then(items => {
                if (items[0] && items[0] !== "")
                    setImage(items[0].default.src);
            })
        }
    }, [item.image])

    useEffect(() => {
        if (cart.find((cartItem) => cartItem.id === item.id))
            setInCart(true);
        else
            setInCart(false);
    }, [cart])

    if (item)
        return (<div className="product-card">
            {item.onSale === true ? <div className="sale-badge">
                Promocja
            </div> : null}
            <div onClick={() => { router.push(`/categories/${item.category}/${item.internalName}`) }} style={{ backgroundImage: `url(${image})` }} className={`product-card_img ${item.category}`} />
            <div className="product-card_desc">
                <div>{item.title}</div>
                <CustomRating rating={item.rating.rate} reviewCount={item.rating.count} />
                <div>
                    <span style={{ textDecoration: item.onSale === true ? "line-through" : "none" }}>{item.price} zł</span>
                    {item.onSale ? <span style={{ color: "#ff2e88", marginLeft: 10 }}>{item.onSale === true ? `${item.salePrice} zł` : null}</span> : null}
                </div>
                <div className="buttons">
                    <IconButton Icon={() => inCart ? <FaCheck /> : <FaPlus />} onClick={() => { handleAddToCart() }} />
                </div>
            </div>
        </div>);
}

export default ProductCard;