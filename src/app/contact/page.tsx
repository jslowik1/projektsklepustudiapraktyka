"use client";

import "@/app/assets/styles/components/_infoPages.scss";
import TextInput from "@/app/components/inputs/TextInput";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success("Wiadomość wysłana! Odpowiemy jak soonest.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="product-main">
      <div className="inside">
        <div className="info-page_container">
          <div className="info-page_header">
            <h1>Kontakt</h1>
            <p>
            Masz pytania? Chętnie odpowiemy! Wyślij nam wiadomość poniżej.
            </p>
          </div>

          <div className="info-page_form">
            <TextInput
              label="Imię i nazwisko"
              placeholder="Jan Kowalski"
              value={formData.name}
              onChange={(v) => handleChange("name", v)}
              disabled={isLoading}
            />

            <TextInput
              label="Adres e-mail"
              placeholder="jan@example.com"
              type="email"
              value={formData.email}
              onChange={(v) => handleChange("email", v)}
              disabled={isLoading}
            />

            <TextInput
              label="Temat"
              placeholder="Twój temat wiadomości"
              value={formData.subject}
              onChange={(v) => handleChange("subject", v)}
              disabled={isLoading}
            />

            <div>
              <label>
                Wiadomość
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                disabled={isLoading}
                placeholder="Opisz swoją sprawę..."
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>
          </div>

          <div className="info-page_footer">
            <h3>Inne sposoby kontaktu</h3>
            <p><strong>Email:</strong> kontakt@gamezone.pl</p>
            <p><strong>Telefon:</strong> +48 123 456 789</p>
            <p><strong>Godziny pracy:</strong> Poniedziałek - Piątek, 9:00 - 17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
