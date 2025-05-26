import { products } from "./assets/products";
import ProductCard from "./components/productCards/ProductCard";


export default function Home() {

  return (
    <div className="inside">

      <div>
        <div className="current-offer">Darmowa dostawa powyżej 500 zł</div>

        <div>
          <h2>Aktywne promocje</h2>
          <div className="sales-container">
            <div className="sale">

            </div>
            <div className="sale">

            </div>
            <div className="sale">

            </div>
            <div className="sale">

            </div>
            <div className="sale">

            </div>
          </div>
        </div>
        <div>
          <h2>Polecane produkty</h2>
          <div className="recommended-products">
            {
              products.sort(() => 0.5 - Math.random()).slice(0, 5).map((item) => <ProductCard key={item.id} item={item} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
