"use client"
import { useGetProducts } from "@/hooks/query/useGetProducts";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Spinner from "./components/inputs/Spinner";
import ProductCard from "./components/productCards/ProductCard";

const Home = () => {
  const products = useGetProducts();
  return (
    <div className="inside">
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <Marquee autoFill pauseOnHover speed={50} gradient={false} className="current-offer" aria-label="Informacje świąteczne">
          <span className="offer-item offer-delivery">Darmowa dostawa powyżej 500 zł</span>
          <span className="offer-item offer-sale"><Link href="/categories/sale" className="holiday-link">Noworoczna wyprzedaż</Link></span>
          <span className="offer-item offer-guarantee">Gwarancja dostawy przed świętami</span>
        </Marquee>
        <div style={{ display: "flex", width: "100%", gap: 40 }}>
          <div style={{ width: "100%" }}>
            <div>
              <div className="sales-container">
                <div className="sale"></div>
                <div className="sale"></div>
                <div className="sale"></div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: "10px 0" }}>Polecane produkty</h2>
              <div className="recommended-products">
                {products.isSuccess ? products.data
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 5)
                  .map((item) => (
                    <ProductCard key={item.id} item={item} />
                  )) : products.isLoading ? <Spinner size={30} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;