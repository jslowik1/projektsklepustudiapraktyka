"use client";
import { useAuth } from "@/app/context/AuthProvider";
import { useCart } from "@/app/context/CartProvider";
import { useScreenWidth } from "@/app/tools/useScreenWidth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdPerson, MdPhone, MdShoppingBasket } from "react-icons/md";
import image from "../../assets/images/logo.png";
import IconButton from "../inputs/IconButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const { cart } = useCart();
  const [visibleNavbar, setVisibleNavbar] = useState<boolean>(false);
  const screenWidth = useScreenWidth();
  const { user, userData } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar_header">
        <div className="navbar_header-logo">
          <Link href="/">
            <Image
              width={100}
              src={image.src}
              className="navbar_header-logo_img"
              alt=""
              height={50}
            />
          </Link>
        </div>
        {(screenWidth && screenWidth < 768) && (
          <IconButton
            Icon={visibleNavbar ? IoClose : BiMenu}
            size={40}
            onClick={() => {
              setVisibleNavbar(!visibleNavbar);
            }}
          />
        )}
        {
          <div
            className={`navbar_buttons ${(screenWidth && screenWidth < 768) ? "mobile" : ""} ${visibleNavbar ? "visible" : ""
              }`}
          >
            <Link
              className={pathname === "/categories/keyboard" ? "active" : ""}
              href="/categories/keyboard"
            >
              Klawiatury
            </Link>
            <Link
              className={pathname === "/categories/mouse" ? "active" : ""}
              href="/categories/mouse"
            >
              Myszki
            </Link>
            <Link
              className={pathname === "/categories/mousepad" ? "active" : ""}
              href="/categories/mousepad"
            >
              Podkładki
            </Link>
            <Link
              className={pathname === "/categories/microphone" ? "active" : ""}
              href="/categories/microphone"
            >
              Mikrofony
            </Link>
            <Link
              className={pathname === "/categories/accessories" ? "active" : ""}
              href="/categories/accessories"
            >
              Akcesoria
            </Link>
            <Link
              className={`${pathname === "/categories/sale" ? "active" : ""} sale`}
              href="/categories/sale"
            >
              Wyprzedaż
            </Link>
          </div>
        }
        <div className="navbar_header-buttons">
          <IconButton disabled Icon={MdPhone} size={40} onClick={() => { }} />
          <div>
            <IconButton
              text={user && userData?.displayName ? userData?.displayName.split(" ")[0] : undefined}
              Icon={MdPerson}
              size={40}
              onClick={() => {
                if (user) router.push("/account")
                else router.push("/login")
              }}
            />
          </div>
          <IconButton
            badgeText={String(cart.length)}
            Icon={MdShoppingBasket}
            size={40}
            onClick={() => {
              router.push("/cart");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
