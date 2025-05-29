"use client";
import { FaCheck } from "react-icons/fa";
import IconButton from "../inputs/IconButton";
import TextInput from "../inputs/TextInput";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../inputs/Spinner";

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
        <a href="">Klawiatury</a>
        <a href="">Myszki</a>
        <a href="">Podkładki</a>
        <a href="">Mikorofony</a>
        <a href="">Akcesoria</a>
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
      </div>
    </div>
  );
};

export default Footer;
