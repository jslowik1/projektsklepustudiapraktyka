"use client";

import Spinner from "@/app/components/inputs/Spinner";
import { useAuth } from "@/app/context/AuthProvider";
import { useRouter } from "next/navigation";
import { BiBox } from "react-icons/bi";
import { MdPerson } from "react-icons/md";

const Layout = ({ children }) => {
  const router = useRouter();
  const { isAdmin, adminLoading } = useAuth();
  return adminLoading ? (
    <Spinner size={60} />
  ) : isAdmin ? (
    <div className="account-inside">
      <h1>Panel administracyjny</h1>
      <div className="buttons">
        <button
          onClick={() => {
            router.push("/account/admin/users");
          }}
        >
          <MdPerson size={20} />
          Użytkownicy
        </button>
        <button
          onClick={() => {
            router.push("/account/admin/products");
          }}
        >
          <BiBox size={20} />
          Produkty
        </button>
      </div>
      {children}
    </div>
  ) : null;
};

export default Layout;
