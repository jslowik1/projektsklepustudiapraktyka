"use client";
import { usePathname, useRouter } from "next/navigation";
import { MdPerson, MdListAlt, MdAdminPanelSettings } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleNavigate = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <div className="product-main account-panel">
      <div className="inside">
        <div className="side-nav">
          <div
            onClick={() => {
              handleNavigate("/account");
            }}
            className={`side-nav_item ${pathname === "/account" ? "active" : ""
              }`}
          >
            <MdPerson size={20} />
            Twoje dane
          </div>
          <div
            onClick={() => {
              handleNavigate("/account/orders");
            }}
            className={`side-nav_item ${pathname.includes("/account/orders") ? "active" : ""
              }`}
          >
            <MdListAlt size={20} />
            Twoje zamówienia
          </div>
          {isAdmin && (
            <div
              onClick={() => {
                handleNavigate("/account/admin");
              }}
              className={`side-nav_item ${pathname === "/account/admin" ? "active" : ""
                }`}
            >
              <MdAdminPanelSettings size={20} />
              Panel administracyjny
            </div>
          )}
        </div>
        <div className="main" style={{ width: "100%" }}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
