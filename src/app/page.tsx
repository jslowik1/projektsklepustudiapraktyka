import ProductCard from "./components/productCards/ProductCard";
import { IProduct } from "./model/IProduct";
import { Product } from "./model/Product";


export default function Home() {
  const products: IProduct[] = [
    {
      id: 2,
      internalName: "keychronV2",
      title: "Keychron V2",
      price: 750,
      description: "Klawiatura",
      image: "",
      category: Product.Keyboard,
      rating: {
        rate: 5,
        count: 1,
      },
    }
  ];

  return (
    <div className="inside">
      <div>
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
            <ProductCard item={products[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
