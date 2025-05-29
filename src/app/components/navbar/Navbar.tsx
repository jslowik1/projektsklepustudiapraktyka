"use client";
import { MdPerson, MdPhone, MdShoppingBasket } from "react-icons/md";
import IconButton from "../inputs/IconButton";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartProvider";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import { useScreenWidth } from "@/app/tools/Tools";
import { IoClose } from "react-icons/io5";
import image from "../../assets/images/logo.png";
import Image from "next/image";
import Modal from "../modal/Modal";
import TextInput from "../inputs/TextInput";
import { useFloating } from "@floating-ui/react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();
  const [visibleNavbar, setVisibleNavbar] = useState<boolean>(false);
  const screenWidth = useScreenWidth();
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [accountDialogShow, setAccountDialogShow] = useState<boolean>(false);
  const { refs, floatingStyles } = useFloating();
  return (
    <div className="navbar">
      <div className="navbar_header">
        <div className="navbar_header-logo">
          <Image
            width={100}
            onClick={() => {
              router.push("/");
            }}
            src={image.src}
            className="navbar_header-logo_img"
            alt=""
            height={50}
          />
        </div>
        {screenWidth < 768 && (
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
            className={`navbar_buttons ${screenWidth < 768 ? "mobile" : ""} ${
              visibleNavbar ? "visible" : ""
            }`}
          >
            <button
              className={pathname === "/categories/keyboard" ? "active" : ""}
              onClick={() => router.push("/categories/keyboard")}
            >
              Klawiatury
            </button>
            <button
              className={pathname === "/categories/mouse" ? "active" : ""}
              onClick={() => router.push("/categories/mouse")}
            >
              Myszki
            </button>
            <button
              className={pathname === "/categories/mousepad" ? "active" : ""}
              onClick={() => router.push("/categories/mousepad")}
            >
              Podkładki
            </button>
            <button
              className={pathname === "/categories/microphone" ? "active" : ""}
              onClick={() => router.push("/categories/microphone")}
            >
              Mikrofony
            </button>
            <button
              className={pathname === "/categories/accessories" ? "active" : ""}
              onClick={() => router.push("/categories/accessories")}
            >
              Akcesoria
            </button>
            <button
              className={`${
                pathname === "/categories/accessories" ? "active" : ""
              } sale`}
              onClick={() => router.push("/categories/sale")}
            >
              Wyprzedaż
            </button>
          </div>
        }
        <div className="navbar_header-buttons">
          <IconButton disabled Icon={MdPhone} size={40} onClick={() => {}} />
          <div ref={refs.setReference}>
            <IconButton
              Icon={MdPerson}
              size={40}
              onClick={() => {
                setAccountDialogShow(!accountDialogShow);
              }}
            />
          </div>
          {accountDialogShow && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="account-popover"
            >
              Nie jesteś zalogowany
              <button>Zaloguj się</button>
              <button>Zarejestuj się</button>
            </div>
          )}
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
      {loginModalVisible && (
        <Modal
          headerText="Logowanie"
          width={400}
          onDimiss={() => setLoginModalVisible(false)}
        >
          <div>
            <TextInput label="Email" onChange={() => {}} />
            <TextInput label="Hasło" type="password" onChange={() => {}} />
            <button onClick={() => {}}>Zaloguj</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
