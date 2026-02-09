"use client";

import Spinner from "@/app/components/inputs/Spinner";
import { useAuth } from "@/app/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiBox, BiListOl } from "react-icons/bi";
import { MdPerson } from "react-icons/md";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAdmin, adminLoading } = useAuth();
  const [isSmall, setIsSmall] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' ? window.localStorage.getItem('adminWarningDismissed') : null;

    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => {
      setIsSmall(mq.matches);
      setShowWarning(mq.matches && !dismissed);
    };
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const handleDontShowAgain = () => {
    window.localStorage.setItem('adminWarningDismissed', '1');
    setShowWarning(false);
  };

  const handleContinue = () => setShowWarning(false);
  const handleBack = () => router.push('/account');

  return adminLoading ? (
    <Spinner size={60} />
  ) : isAdmin ? (
    <div className="account-inside">
      <h1>Panel administracyjny</h1>
      <div className="buttons">
        <button
          onClick={() => {
            router.push('/account/admin/users');
          }}
        >
          <MdPerson size={20} />
          Użytkownicy
        </button>
        <button
          onClick={() => {
            router.push('/account/admin/products');
          }}
        >
          <BiBox size={20} />
          Produkty
        </button>
        <button
          onClick={() => {
            router.push('/account/admin/orders');
          }}
        >
          <BiListOl size={20} />
          Zamówienia
        </button>
      </div>

      {isSmall && showWarning ? (
        <div className="admin-warning">
          <h2>Panel administracyjny jest dostępny tylko na komputerze</h2>
          <p>Panel administracyjny najlepiej działa na większych ekranach. Zalecane jest użycie przeglądarki na komputerze.</p>
          <div className="admin-warning_actions">
            <button className="ghost" onClick={handleBack}>Wróć do konta</button>
            <button className="secondary small" onClick={handleDontShowAgain}>Nie pokazuj ponownie</button>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  ) : null;
};

export default Layout;
