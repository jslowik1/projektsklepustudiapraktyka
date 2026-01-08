import dpd_logo from "@/app/assets/images/dpd_logo.png";
import inpost_logo from "@/app/assets/images/inpost_logo.png";
import IconButton from "@/app/components/inputs/IconButton";
import ProgressBar from "@/app/components/inputs/ProgressBar";
import TextInput from "@/app/components/inputs/TextInput";
import { FaCheck } from "react-icons/fa";

export interface CartSummaryProps {
  totalItems: number;
  discount: number;
  shipping: { key: string; value: number };
  setShipping: (s: { key: string; value: number }) => void;
  total: number;
  code: string;
  setCode: (c: string) => void;
  applyDiscount: () => void;
  cart: any[];
  user: any;
  pathname: string;
  handleProceed: () => void;
  discountError: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, discount, shipping, total, code, setCode, applyDiscount, cart, user, handleProceed, pathname, setShipping, discountError }) => {
  return (<div className="cart-summary">
    <span>Podsumowanie</span>
    <div className="cart-summary-value">
      <span className="cart-summary-value-item">
        <span>Produkty</span> {totalItems.toFixed(2)} zł
      </span>
      {discount > 0 ? (
        <span className="cart-summary-value-item">
          <span>Rabat</span> -{" "}
          {(totalItems * (discount / 100)).toFixed(2)} zł{" "}
        </span>
      ) : null}
      {totalItems < 500 && (
        <span className="cart-summary-value-item">
          <span>Dostawa</span>{" "}
          {totalItems > 500 ? 0 : shipping.value.toFixed(2)} zł{" "}
        </span>
      )}
      <ProgressBar
        label={
          totalItems < 500
            ? `Do darmowej dostawy brakuje Ci ${(
              500 - totalItems
            ).toFixed(2)} zł`
            : "Darmowa dostawa 👏"
        }
        value={totalItems > 500 ? 100 : (totalItems / 500) * 100}
      />

      <span className="cart-summary-value-item">
        <span>Łącznie</span> {total.toFixed(2)} zł{" "}
      </span>

      <div className="cart-summary-value-code">
        <TextInput
          placeholder="Wprowadź kod promocyjny"
          label="Kod promocyjny"
          onChange={setCode}
        />
        <IconButton
          disabled={code === ""}
          onClick={() => {
            applyDiscount();
          }}
          text="Zastosuj"
          Icon={FaCheck}
        />
      </div>
      {discountError && <span style={{ color: "crimson", fontSize: 16 }}>Nieprawidłowy kod promocyjny</span>}
      <div style={{ display: "flex", width: "100%", flexDirection: "column", gap: 10, marginTop: 20 }}>
        <span>Wybierz metodę dostawy:</span>
        <div onClick={() => setShipping({ key: "dpd", value: totalItems > 500 ? 0 : 20 })} style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <img src={dpd_logo.src} alt="DPD Logo" height={30} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>{totalItems > 500 ? "Gratis" : "20 zł"}</span>
            <input type="checkbox" name="dpd" id="dpd" value={20} checked={shipping.key === "dpd"} onChange={() => setShipping({ key: "dpd", value: 20 })} />
          </div>
        </div>
        <hr></hr>
        <div onClick={() => setShipping({ key: "inpost", value: totalItems > 500 ? 0 : 15 })} style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <img src={inpost_logo.src} height={30} alt="InPost Logo" />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>{totalItems > 500 ? "Gratis" : "15 zł"}</span>
            <input type="checkbox" name="inpost" id="inpost" value={15} checked={shipping.key === "inpost"} onChange={() => setShipping({ key: "inpost", value: 15 })} />
          </div>
        </div>
        <hr></hr>
        <div onClick={() => setShipping({ key: "personal", value: 0 })} style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <span>Odbiór osobisty</span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>Gratis</span>
            <input type="checkbox" name="personal" id="personal" value={0} checked={shipping.key === "personal"} onChange={() => setShipping({ key: "personal", value: 0 })} />
          </div>
        </div>
      </div>
      <button disabled={cart.length <= 0 || !user} onClick={() => { handleProceed() }} className={`cart-summary-value-button ${(cart.length <= 0 || !user) ? "disabled" : ""}`}>
        {pathname === "/cart/checkout" ? "Kup i zapłać" : "Wprowadź adres odbiorcy"}
      </button>
      {!user && <span style={{ color: "crimson", fontSize: 16 }}>Aby dokonać zakupu, musisz być zalogowany</span>}
    </div>
  </div>);
}

export default CartSummary;