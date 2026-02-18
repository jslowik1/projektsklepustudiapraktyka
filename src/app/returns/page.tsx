
const ReturnsPage = () => {
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
              }}>Zwroty i reklamacje</h1>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(255, 46, 136, 0.1) 0%, rgba(255, 122, 166, 0.1) 100%)",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h2 style={{
              fontSize: "24px",
              margin: "0 0 15px 0",
              color: "#fff"
            }}>📋 Prawo do zwrotu</h2>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.7" }}>
              W myśl ustawy o ochronie konsumenta, masz prawo zwrócić zakupiony produkt w ciągu <strong style={{ color: "#ff2e88" }}>14 dni</strong> od daty dostarczenia,
              bez podawania przyczyny.
            </p>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h3 style={{
              fontSize: "20px",
              margin: "0 0 15px 0",
              color: "#fff"
            }}>Procedura zwrotu</h3>
            <ol style={{ color: "#aaa", margin: "0", lineHeight: "2", paddingLeft: "20px" }}>
              <li>Skontaktuj się z nami poprzez <a href="/contact" style={{ color: "#ff2e88", textDecoration: "none" }}>formularz kontaktowy</a></li>
              <li>Otrzymasz instrukcje zwrotu i adres przesyłki</li>
              <li>Zapakuj produkt bezpiecznie w oryginalne opakowanie</li>
              <li>Wyślij paczkę zgodnie z instrukcjami</li>
              <li>Po otrzymaniu zwrotu, zostanie Ci zwrócona wpłata (bez kosztów dostawy)</li>
            </ol>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h3 style={{
              fontSize: "20px",
              margin: "0 0 15px 0",
              color: "#fff"
            }}>✅ Warunki zwrotu</h3>
            <p style={{ color: "#aaa", margin: "0 0 12px 0", fontWeight: "bold" }}>Produkt musi być:</p>
            <ul style={{ color: "#aaa", margin: "0", lineHeight: "1.8", paddingLeft: "20px" }}>
              <li>W oryginalnym, nieniszczonym opakowaniu</li>
              <li>Nieużywany lub w stanie nienowszym (z normalnymi śladami użytkowania)</li>
              <li>Z dołączonymi wszystkimi akcesoriami i dokumentacją</li>
            </ul>
          </div>

          <div style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
            borderLeft: "4px solid #ff2e88"
          }}>
            <h3 style={{
              fontSize: "20px",
              margin: "0 0 15px 0",
              color: "#fff"
            }}>⚠️ Wyjątki</h3>
            <p style={{ color: "#aaa", margin: "0 0 12px 0", fontWeight: "bold" }}>Prawo do zwrotu nie obowiązuje dla:</p>
            <ul style={{ color: "#aaa", margin: "0", lineHeight: "1.8", paddingLeft: "20px" }}>
              <li>Produktów uszkodzonych w wyniku niewłaściwego użycia</li>
              <li>Produktów bez oryginalnego opakowania</li>
              <li>Produktów wyraźnie zaznaczonych jako niepodlegające zwrotowi</li>
            </ul>
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
            }}>🔧 Reklamacja</h3>
            <p style={{ color: "#aaa", margin: "0 0 12px 0", lineHeight: "1.6" }}>
              Jeśli produkt ma wadę fabryczną lub jest uszkodzony w transporcie, skontaktuj się z nami możliwie szybko.
              Masz prawo do reklamacji w ciągu <strong style={{ color: "#ff2e88" }}>2 lat</strong> od daty zakupu.
            </p>
            <p style={{ color: "#aaa", margin: "0", lineHeight: "1.6" }}>
              Oferujemy wymianę, naprawę lub pełny zwrot pieniędzy dla produktów uszkodzonych.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
