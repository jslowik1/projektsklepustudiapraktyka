"use client"
import { IProduct } from "@/app/model/IProduct";
import { useGetProducts } from "@/hooks/query/useGetProducts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./productPage.scss";
import { useCart } from "@/app/context/CartProvider";
import Rating from "@/app/components/inputs/Rating";
import toast from "react-hot-toast";

const Page = () => {
    const { product } = useParams<{ product: string }>();
    const productsQuery = useGetProducts();
    const [productInfo, setProductInfo] = useState<IProduct>();
    const { addToCart, cart, removeFromCart } = useCart();
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    useEffect(() => {
        if (product && productsQuery.data) {
            const newProduct = productsQuery.data.find(p => p.id === product);
            if (newProduct) {
                setProductInfo(newProduct);
            }
        }
    }, [productsQuery.status, product, productsQuery.data]);

    const handleAddToCart = () => {
        if (productInfo && cart && cart.some(p => p.id === productInfo?.id)) {
            console.log(productInfo);
            removeFromCart(productInfo.id);
            toast(`Usunięto ${productInfo?.title} z koszyka`);
        } else if (productInfo && cart && !cart.some(p => p.id === productInfo?.id)) {
            addToCart(productInfo);
            toast(`Dodano ${productInfo.title} do koszyka`);
        }
    }

    useEffect(() => {
        if (cart && productInfo) {
            setAlreadyInCart(cart.some(p => p.id === productInfo.id));
        }
    }, [cart, productInfo])

    return (
        <div className="product-page">
            <div className="product-page-container">
                {productInfo && <>
                    <div className="product-page-image-container">
                        <div className="product-page-image" style={{ backgroundImage: `url(${productInfo.image})` }}></div>
                    </div>
                    <div className="product-page-info">
                        <div className="product-page-info-container">
                            <h1>{productInfo.title}</h1>
                            <Rating rating={productInfo.rating.rate} reviewCount={productInfo.rating.count} />
                            <h2>{productInfo.price} zł</h2>
                            <p>{productInfo.description}</p>
                            <div className="buttons">
                                <button onClick={() => { handleAddToCart() }}>
                                    {alreadyInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
}

export default Page;