"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";

import { useCreateOrder } from "@/hooks/mutations/useCreateOrderMutation";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import CartSummary from "./summary/CartSummary";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { cart, clearCart } = useCart();
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [shipping, setShipping] = useState<{ key: string, value: number }>({ key: "dpd", value: 20 });
  const router = useRouter();
  const pathname = usePathname();
  const [hideSummary, setHideSummary] = useState<boolean>(false);
  const { user, userData } = useAuth();
  const createOrderMutation = useCreateOrder();

  useEffect(() => {
    setTotalItems(
      cart.reduce((acc, item) => acc + (item.onSale && item.salePrice ? item.salePrice : item.price) * item.quantity, 0)
    );
  }, [cart]);

  const applyDiscount = () => {
    if (code === "10") {
      setDiscount(10);
      sessionStorage.setItem("discount", "10");
      discountError && setDiscountError(false);
    } else if (code === "20") {
      setDiscount(20);
      sessionStorage.setItem("discount", "20");
      discountError && setDiscountError(false);
    } else if (code === "30") {
      setDiscount(30);
      sessionStorage.setItem("discount", "30");
      discountError && setDiscountError(false);
    } else {
      setDiscount(0);
      sessionStorage.removeItem("discount");
      setDiscountError(true);
    }
  };

  useEffect(() => {
    const savedDiscount = sessionStorage.getItem("discount");
    if (savedDiscount) {
      setDiscount(parseInt(savedDiscount));
    }
  }, [])

  useEffect(() => {
    setTotal(
      totalItems +
      (totalItems > 500 ? 0 : shipping.value) -
      totalItems * (discount / 100)
    );
  }, [discount, totalItems, shipping]);



  const handleProceed = () => {
    if (cart.length > 0 && pathname === "/cart") router.push("cart/checkout")
    else if (cart.length > 0 && pathname === "/cart/checkout") {
      if (user && cart && userData)
        void createOrderMutation.mutateAsync({ user: user, cart: cart, shippingAddress: userData.address })
          .then(docInfo => {
            router.push("/cart/complete/" + docInfo.id);
            clearCart();
            setHideSummary(true);
          })
    }
  }

  return (
    <div className="product-main cart-layout">
      <div className="cart">
        <h1>Koszyk</h1>
        <div className="cart-container">
          {children}
        </div>
      </div>
      {hideSummary !== true &&
        <CartSummary
          totalItems={totalItems}
          discount={discount}
          total={total}
          shipping={shipping}
          setShipping={setShipping}
          code={code}
          setCode={setCode}
          applyDiscount={applyDiscount}
          cart={cart}
          user={user}
          pathname={pathname}
          discountError={discountError}
          handleProceed={handleProceed} />}
    </div >
  );
};

export default Layout;
