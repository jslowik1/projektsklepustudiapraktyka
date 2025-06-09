"use client";
import { FaCheck } from "react-icons/fa";
import IconButton from "../inputs/IconButton";
import TextInput from "../inputs/TextInput";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../inputs/Spinner";
import Link from "next/link";

const Footer = () => {
  const [newsletterMail, setNewsletterMail] = useState<string>("");
  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(false);
  const [newsletterList, setNewsletterList] = useState<string[]>([]);

  const handleNewsletter = () => {
    setNewsletterLoading(true);
    setTimeout(() => {
      if (newsletterMail) {
        if (newsletterList.find((item) => item === newsletterMail)) {
          toast.error("Ten email jest juz zapisany do newslettera");
          setNewsletterLoading(false);
          return;
        }
        setNewsletterList([...newsletterList, newsletterMail]);
        setNewsletterMail("");
        setNewsletterLoading(false);
        toast.success("Zapisano do newslettera");
      }
    }, 2000);
  };

  return (
    <>
      <div className="footer">
        <div className="footer_column">
          <h3>Informacje</h3>
          <a href="">O nas</a>
          <a href="">Regulamin</a>
          <a href="">Polityka prywatności</a>
          <a href="">Kontakt</a>
        </div>
        <div className="footer_column">
          <h3>Obsługa</h3>
          <a href="">Dostawa i płatności</a>
          <a href="">Zwroty</a>
          <a href="">FAQ</a>
        </div>
        <div className="footer_column">
          <h3>Kategorie</h3>
          <Link href="/categories/keyboard">Klawiatury</Link>
          <Link href="/categories/mouse">Myszki</Link>
          <Link href="/categories/mousepad">Podkładki</Link>
          <Link href="/categories/microphone">Mikorofony</Link>
          <Link href="/categories/accessories">Akcesoria</Link>
        </div>
        <div className="footer_column">
          <h3>Zapisz się do newslettera</h3>
          <span>
            Zapisz się do newslettera i otrzymasz informacje o najnowszych
            promocjach i ofertach.
          </span>
          <div className="newsletter">
            <TextInput
              placeholder="Twój adres email"
              onChange={setNewsletterMail}
            />
            {!newsletterLoading ? (
              <IconButton
                disabled={newsletterMail === "" || !newsletterMail.includes("@")}
                Icon={FaCheck}
                onClick={handleNewsletter}
              />
            ) : (
              <Spinner size={30} />
            )}
          </div>

          <div style={{ maxWidth: "400px" }}>
            <p>
              © Copyright 2025 - All rights reserved. <br />
              <a href="https://github.com/jslowik1">Jakub Słowik</a>
            </p>
            <p>Kod projektu: <a href="https://github.com/jslowik1/projektsklepustudiapraktyka">GitHub</a></p>
            <p>Jest to wersja demonstracyjna sklepu. Aplikacja jest wykorzystywana tylko w celach edukacyjnych. Zamówienia nie zostaną zrealizowane. <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
