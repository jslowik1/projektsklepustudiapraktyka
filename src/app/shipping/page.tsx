
const ShippingPage = () => {
  return (
    <div className="product-main">
      <div className="inside">
        <div style={{
          maxWidth: "900px",
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
              }}>Dostawa i płatności</h1>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
            <div style={{
              background: "#111",
              padding: "25px",
              borderRadius: "10px",
              borderLeft: "4px solid #ff2e88"
            }}>
              <h3 style={{
                fontSize: "18px",
                margin: "0 0 15px 0",
                color: "#fff"
              }}>📦 Paczkomat InPost</h3>
              <p style={{ color: "#aaa", margin: "0 0 12px 0", lineHeight: "1.6" }}>
                Dostawa do paczkomatu InPost — szybko i wygodnie. Możliwość odebrania 24/7.
              </p>
              <p style={{ color: "#ff2e88", margin: "0", fontWeight: "bold" }}>⏱️ 1-2 dni robocze</p>
              <p style={{ color: "#ff2e88", margin: "8px 0 0 0", fontWeight: "bold" }}>💰 od 15 PLN</p>
            </div>

            <div style={{
              background: "#111",
              padding: "25px",
              borderRadius: "10px",
              borderLeft: "4px solid #ff2e88"
            }}>
              <h3 style={{
                fontSize: "18px",
                margin: "0 0 15px 0",
                color: "#fff"
              }}>🚚 Kurier DPD</h3>
              <p style={{ color: "#aaa", margin: "0 0 12px 0", lineHeight: "1.6" }}>
                Dostarczenie bezpośrednio pod Twój adres.
              </p>
              <p style={{ color: "#ff2e88", margin: "0", fontWeight: "bold" }}>⏱️ 1-3 dni robocze</p>
              <p style={{ color: "#ff2e88", margin: "8px 0 0 0", fontWeight: "bold" }}>💰 od 20 PLN</p>
            </div>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            borderLeft: "4px solid #ff2e88",
            marginBottom: "40px"
          }}>
            <h3 style={{
              fontSize: "18px",
              margin: "0 0 15px 0",
              color: "#fff"
            }}>🏪 Odbiór osobisty</h3>
            <p style={{ color: "#aaa", margin: "0 0 12px 0", lineHeight: "1.6" }}>
              Możliwość odbioru zamówienia w naszym siedzibie.
            </p>
            <p style={{ color: "#ff2e88", margin: "0", fontWeight: "bold" }}>⏱️ 1-2 dni robocze</p>
            <p style={{ color: "#4ade80", margin: "8px 0 0 0", fontWeight: "bold" }}>💚 GRATIS</p>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(255, 46, 136, 0.1) 0%, rgba(255, 122, 166, 0.1) 100%)",
            padding: "30px",
            borderRadius: "10px",
            borderLeft: "4px solid #ff2e88",
            marginBottom: "40px"
          }}>
            <h2 style={{
              fontSize: "28px",
              margin: "0 0 20px 0",
              color: "#fff"
            }}>💳 Metody płatności</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <p style={{ color: "#ff2e88", fontWeight: "bold", marginBottom: "5px" }}>Karta kredytowa/debetowa</p>
                <p style={{ color: "#aaa", margin: "0", fontSize: "14px" }}>Visa, Mastercard i inne karty</p>
              </div>
              <div>
                <p style={{ color: "#ff2e88", fontWeight: "bold", marginBottom: "5px" }}>Przelewy24</p>
                <p style={{ color: "#aaa", margin: "0", fontSize: "14px" }}>Szybka autoryzacja</p>
              </div>
              <div>
                <p style={{ color: "#ff2e88", fontWeight: "bold", marginBottom: "5px" }}>PayPal</p>
                <p style={{ color: "#aaa", margin: "0", fontSize: "14px" }}>Bezpieczna płatność</p>
              </div>
              <div>
                <p style={{ color: "#ff2e88", fontWeight: "bold", marginBottom: "5px" }}>Apple Pay / Google Pay</p>
                <p style={{ color: "#aaa", margin: "0", fontSize: "14px" }}>Szybkie płatności</p>
              </div>
            </div>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h3 style={{
              fontSize: "20px",
              margin: "0 0 15px 0",
              color: "#fff"
            }}>🔒 Bezpieczeństwo</h3>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Wszystkie transakcje są szyfrowane przy pomocy technologii SSL. Twoje dane karty nie są przechowywane na naszych serwerach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
