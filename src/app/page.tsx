"use client"
import { useGetProducts } from "@/hooks/query/useGetProducts";
import ProductCard from "./components/productCards/ProductCard";
import Spinner from "./components/inputs/Spinner";

const Home = () => {
  const products = useGetProducts();
  return (
    <div className="inside">
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <div className="current-offer">
          <span>Darmowa dostawa powyżej 500 zł</span>
          <span>Darmowa dostawa powyżej 500 zł</span>
          <span>Darmowa dostawa powyżej 500 zł</span>
        </div>
        <div style={{ display: "flex", width: "100%", gap: 40 }}>
          <div>
            <div>
              <h2 style={{ margin: "10px 0" }}>Najnowsze produkty</h2>
              <div className="promo-image"></div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div>
              <h2 style={{ margin: "10px 0" }}>Aktywne promocje</h2>
              <div className="sales-container">
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