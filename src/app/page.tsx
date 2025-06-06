import { products } from "./assets/products";
import ProductCard from "./components/productCards/ProductCard";

export default function Home() {
  return (
    <div className="inside">
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <div className="current-offer">Darmowa dostawa powyżej 500 zł</div>
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
                {products
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 5)
                  .map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
