
const TermsPage = () => {
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
              }}>Regulamin sklepu</h1>
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
            }}>1. Postanowienia ogólne</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Regulamin określa warunki korzystania ze sklepu GameZone oraz prawa i obowiązki kupujących i sprzedawcy.
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
            }}>2. Zakup produktów</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Każdy zakup w sklepie GameZone jest dokonywany z pełną świadomością warunków zawartych w niniejszym regulaminie.
              Klient oświadcza, że posiada pełną zdolność do czynności prawnych.
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
            }}>3. Cena</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Ceny wszystkich produktów są podane w złotych polskich (PLN) i zawierają podatek VAT.
              Koszt wysyłki jest pokazywany przed finalizacją zamówienia.
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
            }}>4. Koszyk i zamówienie</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Umieszczenie produktu w koszyku nie stanowi wiążącej oferty. Oferta wiążąca powstaje w momencie złożenia zamówienia
              i potwierdzenia go przez sklep.
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
            }}>5. Płatności</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Akceptujemy główne karty kredytowe i debetowe. Płatność musi być dokonana przed wysyłką zamówienia.
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
            }}>6. Odpowiedzialność</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              GameZone nie ponosi odpowiedzialności za szkody wynikające z nieprawidłowego użytkowania produktów
              lub niezastosowania się do instrukcji producenta.
            </p>
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

export default TermsPage;
