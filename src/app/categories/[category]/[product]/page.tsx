"use client"
import Rating from "@/app/components/inputs/Rating";
import Spinner from "@/app/components/inputs/Spinner";
import { useCart } from "@/app/context/CartProvider";
import { IProduct } from "@/app/model/IProduct";
import { translateCategory } from "@/app/tools/Tools";
import { useGetProducts } from "@/hooks/query/useGetProducts";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "./productPage.scss";

const Page = () => {
    const { category, product } = useParams<{ category: string; product: string }>();
    const productsQuery = useGetProducts();
    const [productInfo, setProductInfo] = useState<IProduct | undefined>(undefined);
    const { addToCart, cart, removeFromCart } = useCart();
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const [qty, setQty] = useState(1);
    const [specOpen, setSpecOpen] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        if (product && productsQuery.data) {
            const newProduct = productsQuery.data.find(p => p.id === product);
            setProductInfo(newProduct);
        }
    }, [productsQuery.data, product]);

    useEffect(() => {
        if (cart && productInfo) {
            setAlreadyInCart(cart.some(p => p.id === productInfo.id));
        }
    }, [cart, productInfo]);

    const handleAddToCart = () => {
        if (!productInfo) return;

        if (!alreadyInCart && productInfo.soldOut) {
            toast.error("Produkt jest wyprzedany");
            return;
        }

        if (alreadyInCart) {
            removeFromCart(productInfo.id);
            toast.success(`Usunięto ${productInfo.title} z koszyka`);
        } else {
            const itemWithQty = { ...productInfo, qty } as any;
            addToCart(itemWithQty);
            toast.success(`Dodano ${productInfo.title} (x${qty}) do koszyka`);
        }
    };

    if (productsQuery.isLoading) {
        return (
            <div className="product-page">
                <div className="product-page-container loading">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!productInfo) {
        return (
            <div className="product-page">
                <div className="product-page-container not-found">
                    <p>Produkt nie został znaleziony.</p>
                    <Link href="/">Powrót do sklepu</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="product-page-container">
                <div className="product-page-image-container">
                    <div className="product-slider">
                        {/** prepare images (support single string or array) */}
                        {(() => {
                            const images = productInfo ? (Array.isArray(productInfo.image) ? productInfo.image : [productInfo.image]) : [];
                            return (
                                <>
                                    <Swiper
                                        modules={[Navigation, Thumbs]}
                                        navigation
                                        thumbs={{ swiper: thumbsSwiper }}
                                        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                                        className="main-swiper">
                                        {images.map((src, i) => (
                                            <SwiperSlide key={i}>
                                                <img src={src} alt={`${productInfo.title} - ${i + 1}`} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {images.length > 1 && (
                                        <>
                                            <div className="image-counter">{activeIndex + 1} / {images.length} <span className="remaining">Pozostało: {Math.max(0, images.length - (activeIndex + 1))}</span></div>

                                            <Swiper
                                                onSwiper={setThumbsSwiper}
                                                slidesPerView={Math.min(4, images.length)}
                                                watchSlidesProgress
                                                className="thumbs-swiper">
                                                {images.map((src, i) => (
                                                    <SwiperSlide key={`t-${i}`}>
                                                        <img src={src} alt={`thumb ${i + 1}`} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
                <div className="product-page-info">
                    <div className="product-page-info-container">
                        <nav className="breadcrumb">
                            <Link href="/">Sklep</Link>
                            {category && <><span>›</span><Link href={`/categories/${category}`}>{translateCategory(category)}</Link></>}
                            <span>›</span>
                            <span className="current">{productInfo.title}</span>
                        </nav>

                        <h1>{productInfo.title}</h1>

                        <div className="meta">
                            <Rating rating={productInfo.rating.rate} reviewCount={productInfo.rating.count} />
                            <div className="badges">
                              {productInfo.onSale ? <span className="badge sale">Promocja</span> : null}
                              {productInfo.soldOut ? <span className="badge sold">Wyprzedane</span> : null}
                            </div>
                            <div className="price">
                              {productInfo.onSale && productInfo.salePrice ? (
                                <>
                                  <span className="old">{productInfo.price.toFixed(2)} zł</span>
                                  <span className="new">{productInfo.salePrice.toFixed(2)} zł</span>
                                </>
                              ) : (
                                <span>{productInfo.price.toFixed(2)} zł</span>
                              )}
                            </div>
                        </div>

                        <p className="description">{productInfo.description}</p>

                        <div className="specs">
                            <button className="specs-toggle" onClick={() => setSpecOpen(s => !s)} aria-expanded={specOpen}>
                                <span>Specyfikacja</span>
                                <span className={`chev ${specOpen ? 'open' : ''}`} aria-hidden>▾</span>
                            </button>

                            <div className={`specs-content ${specOpen ? 'open' : ''}`} aria-hidden={!specOpen}>
                                {(() => {
                                    const specsRaw = (productInfo as any).specs;
                                    const specs = specsRaw ? (Array.isArray(specsRaw) ? specsRaw : Object.entries(specsRaw).map(([k, v]) => ({ label: k, value: v }))) : [];
                                    if (!specs || specs.length === 0) {
                                        return <div className="no-specs">Brak szczegółowej specyfikacji.</div>;
                                    }
                                    return specs.map((s: any, i: number) => (
                                        <div key={i} className="spec-item">
                                            <div className="label">{s.label}</div>
                                            <div className="value">{String(s.value)}</div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        <div className="purchase-row">
                            {!productInfo.soldOut && (
                              <div className="quantity-selector">
                                  <button aria-label="Zmniejsz ilość" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                                  <input aria-label="Ilość" value={qty} onChange={(e) => {
                                      const v = Number(e.target.value || 1);
                                      setQty(isNaN(v) ? 1 : Math.max(1, v));
                                  }} />
                                  <button aria-label="Zwiększ ilość" onClick={() => setQty(q => q + 1)}>+</button>
                              </div>
                            )}

                            <div className="buttons">
                                <button className={`${alreadyInCart ? 'active' : ''} ${productInfo.soldOut ? 'disabled' : ''}`} onClick={handleAddToCart} disabled={productInfo.soldOut}>
                                    {productInfo.soldOut ? 'Wyprzedane' : alreadyInCart ? 'Usuń z koszyka' : 'Dodaj do koszyka'}
                                </button>
                            </div>
                        </div>

                        <div className="extras">
                            <small>SKU: <code>{productInfo.id}</code></small>
                            <small>Opinie: {productInfo.rating.count}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;