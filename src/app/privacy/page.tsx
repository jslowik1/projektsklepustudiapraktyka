
const PrivacyPage = () => {
  return (
    <div className="product-main">
      <div className="inside">
        <div style={{
          maxWidth: "800px",
          margin: "60px auto",
          padding: "0 20px"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #ff2e88 0%, #ff7aa6 100%)",
            padding: "2px",
            borderRadius: "12px",
            marginBottom: "40px"
          }}>
            <div style={{
              background: "#0a0a0a",
              padding: "30px",
              borderRadius: "10px"
            }}>
              <h1 style={{
                fontSize: "42px",
                margin: "0",
                background: "linear-gradient(135deg, #ff2e88 0%, #ff7aa6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>Polityka prywatności</h1>
            </div>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "20px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h2 style={{
              fontSize: "20px",
              margin: "0 0 12px 0",
              color: "#fff"
            }}>1. Wstęp</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              GameZone zobowiązuje się do ochrony Twojej prywatności.
              Niniejsza polityka wyjaśnia jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.
            </p>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "20px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h2 style={{
              fontSize: "20px",
              margin: "0 0 12px 0",
              color: "#fff"
            }}>2. Zbieranie danych</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Zbieramy dane osobowe takie jak: imię, nazwisko, adres e-mail, numer telefonu i adres dostawy.
              Dane te zbierane są wyłącznie w celu realizacji Twojego zamówienia i komunikacji.
            </p>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "20px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h2 style={{
              fontSize: "20px",
              margin: "0 0 12px 0",
              color: "#fff"
            }}>3. Wykorzystanie danych</h2>
            <p style={{ color: "#aaa", margin: "0 0 12px 0", lineHeight: "1.6" }}>Twoje dane będą wykorzystywane do:</p>
            <ul style={{ color: "#aaa", margin: "0", lineHeight: "1.8", paddingLeft: "20px" }}>
              <li>Przetwarzania zamówień</li>
              <li>Wysyłki produktów</li>
              <li>Komunikacji na temat zamówienia</li>
              <li>Wysyłki promocji (za Twoją zgodą)</li>
            </ul>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "20px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h2 style={{
              fontSize: "20px",
              margin: "0 0 12px 0",
              color: "#fff"
            }}>4. Bezpieczeństwo danych</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Twoje dane są przechowywane na bezpiecznych serwerach z szyfrowaniem SSL.
              Dostęp do danych mają tylko upoważnieni pracownicy.
            </p>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h2 style={{
              fontSize: "20px",
              margin: "0 0 12px 0",
              color: "#fff"
            }}>5. Prawa użytkownika</h2>
            <p style={{ color: "#aaa", margin: "0 0 12px 0", lineHeight: "1.6" }}>Masz prawo do:</p>
            <ul style={{ color: "#aaa", margin: "0", lineHeight: "1.8", paddingLeft: "20px" }}>
              <li>Dostępu do swoich danych osobowych</li>
              <li>Poprawy swoich danych</li>
              <li>Usunięcia swoich danych</li>
              <li>Rezygnacji z marketingu</li>
            </ul>
          </div>

          <p style={{
            marginTop: "40px",
            fontStyle: "italic",
            color: "#666",
            textAlign: "center"
          }}>
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
