"use client";
import { MdPerson, MdPhone, MdShoppingBasket } from "react-icons/md";
import IconButton from "../IconButton";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartProvider";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import { useScreenWidth } from "@/app/tools/Tools";
import { IoClose } from "react-icons/io5";
import image from "../../assets/images/logo.png"
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();
  const [visibleNavbar, setVisibleNavbar] = useState<boolean>(false);
  const screenWidth = useScreenWidth();

  return (
    <div className="navbar">
      <div className="navbar_header">
        <div className="navbar_header-logo">
          <img onClick={() => { router.push("/") }} src={image.src} className="navbar_header-logo_img" alt="" height={50} />
        </div>
        {screenWidth < 768 && <IconButton Icon={visibleNavbar ? IoClose : BiMenu} size={40} onClick={() => { setVisibleNavbar(!visibleNavbar) }} />}
        {<div className={`navbar_buttons ${screenWidth < 768 ? "mobile" : ""} ${visibleNavbar ? "visible" : ""}`}>
          <button className={pathname === "/categories/keyboard" ? "active" : ""} onClick={() => router.push("/categories/keyboard")}>Klawiatury</button>
          <button className={pathname === "/categories/mouse" ? "active" : ""} onClick={() => router.push("/categories/mouse")}>Myszki</button>
          <button className={pathname === "/categories/mousepad" ? "active" : ""} onClick={() => router.push("/categories/mousepad")}>Podkładki</button>
          <button className={pathname === "/categories/microphone" ? "active" : ""} onClick={() => router.push("/categories/microphone")}>Mikrofony</button>
          <button className={pathname === "/categories/accessories" ? "active" : ""} onClick={() => router.push("/categories/accessories")}>Akcesoria</button>
          <button className={`${pathname === "/categories/accessories" ? "active" : ""} sale`} onClick={() => router.push("/sale")}>Wyprzedaż</button>
        </div>}
        <div className="navbar_header-buttons">
          <IconButton Icon={MdPhone} text="Kontakt" size={20} onClick={() => { }} />
          <IconButton Icon={MdPerson} text="Konto" size={20} onClick={() => { }} />
          <IconButton Icon={MdShoppingBasket} text={`Koszyk ${cart.length}`} size={20} onClick={() => { router.push("/cart") }} />
        </div>
      </div>

    </div>

  );
};

export default Navbar;
