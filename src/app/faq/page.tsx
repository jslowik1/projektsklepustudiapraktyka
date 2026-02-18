"use client";

import "@/app/assets/styles/components/_infoPages.scss";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Ile czasu trwa dostawa?",
      answer: "Czas dostawy zależy od wybranej metody. Paczkomat InPost: 1-2 dni. Kurier: 1-3 dni. Śledzenie przesyłki jest dostępne na Twój adres e-mail."
    },
    {
      question: "Jakie metody płatności akceptujecie?",
      answer: "Akceptujemy karty kredytowe (Visa, Mastercard), Przelewy24, PayPal i inne popularne metody. Wszystkie transakcje są szyfrowane i bezpieczne."
    },
    {
      question: "Czy mogę zwrócić produkt?",
      answer: "Tak! Masz 14 dni od daty dostarczenia, aby zwrócić produkt w oryginalnym opakowaniu. Brak ukrytych opłat — zwrot kosztów dostawy będzie wykonany."
    },
    {
      question: "Co zrobić, jeśli produkt jest uszkodzony?",
      answer: "Skontaktuj się z nami poprzez formularz kontaktowy ze zdjęciami. Oferujemy wymianę, naprawę lub pełny zwrot pieniędzy dla produktów uszkodzonych w transporcie."
    },
    {
      question: "Czy dostarczacie za granicę?",
      answer: "Obecnie dostarczamy tylko na terenie Polski. Informacje o międzynarodowej dostawie mogą się zmienić — sprawdź naszą stronę lub skontaktuj się z nami."
    },
    {
      question: "Czy mogę zmieniać zamówienie?",
      answer: "Jeśli zamówienie jeszcze nie zostało wysłane, możemy spróbować je zmodyfikować. Skontaktuj się z nami jak najszybciej!"
    },
    {
      question: "Jakie marki macie w ofercie?",
      answer: "Oferujemy produkty od znanych marek takich jak Logitech, HyperX, SteelSeries, Corsair, Mad Catz i wielu innych. Przeglądaj naszą kategorię produktów."
    },
    {
      question: "Gdzie mogę znaleźć numer śledzenia?",
      answer: "Numer śledzenia zostanie wysłany na Twój adres e-mail po wysyłce zamówienia. Możesz go użyć na stronie kuriera, aby śledzić paczkę w czasie rzeczywistym."
    },
    {
      question: "Czy jest gwarancja producenta?",
      answer: "Wszystkie produkty mają gwarancję producenta. Szczegóły gwarancji są dostępne w dokumentacji produktu. Nasze wsparcie dostępne jest również po wygaśnięciu gwarancji."
    },
    {
      question: "Jak mogę się zapisać do newslettera?",
      answer: "Formularz do zapisu na newsletter znajduje się w stopce naszej strony. Będziesz otrzymywać informacje o promocjach, nowościach i specjalnych ofertach!"
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="product-main">
      <div className="inside">
        <div className="info-page_container">
          <div className="info-page_header">
            <h1>Najczęściej Zadawane Pytania (FAQ)</h1>
            <p>
              Poniżej znajdziesz odpowiedzi na najpopularniejsze pytania. Jeśli nie znajdziesz odpowiedzi,{" "}
              <a href="/contact">skontaktuj się z nami</a>.
            </p>
          </div>

          <div className="info-page_faq">
            {faqs.map((faq, index) => (
              <div key={index} className="info-page_faq_item">
                <button
                  onClick={() => toggleExpand(index)}
                  className="info-page_faq_item_button"
                >
                  <span>{faq.question}</span>
                  <FaChevronDown
                    size={14}
                    style={{
                      transform: expandedIndex === index ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  />
                </button>

                {expandedIndex === index && (
                  <div className="info-page_faq_item_answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="info-page_footer">
            <h3>Nie znalazłeś odpowiedzi?</h3>
            <p>Nasze wsparcie jest zawsze dostępne, aby Ci pomóc.</p>
            <a href="/contact">
              Skontaktuj się z nami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
