"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import IconButton from "../inputs/IconButton";
import Spinner from "../inputs/Spinner";
import TextInput from "../inputs/TextInput";

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
          <Link href="/about">O nas</Link>
          <Link href="/terms">Regulamin</Link>
          <Link href="/privacy">Polityka prywatności</Link>
          <Link href="/contact">Kontakt</Link>
        </div>
        <div className="footer_column">
          <h3>Obsługa</h3>
          <Link href="/shipping">Dostawa i płatności</Link>
          <Link href="/returns">Zwroty</Link>
          <Link href="/faq">FAQ</Link>
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
              type="email"
            />
            {!newsletterLoading ? (
              <IconButton
                disabled={newsletterMail === "" || !newsletterMail.includes("@")}
                Icon={FaCheck}
                onClick={handleNewsletter}
                aria-label="Zapisz do newslettera"
              />
            ) : (
              <Spinner size={30} />
            )}
          </div>

          <div style={{ maxWidth: "400px" }}>
            <p>
              &copy; {new Date().getFullYear()} GameZone - All rights reserved. <br />
              Designed & Developed by <a href="https://github.com/jslowik1" target="_blank" rel="noopener noreferrer">Jakub Słowik</a>
            </p>
            <p>
              Kod źródłowy: <a href="https://github.com/jslowik1/projektsklepustudiapraktyka" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
