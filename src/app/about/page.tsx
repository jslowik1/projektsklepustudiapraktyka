
const AboutPage = () => {
  return (
    <div className="product-main">
      <div className="inside">
        <div className="info-page_container">
          <div className="info-page_header">
            <h1>O nas</h1>
            <p>
            Witaj w GameZone — nowoczesnym sklepie internetowym dedykowanym miłośnikom gier komputerowych i profesjonalnym graczom.
            </p>
          </div>

          <div className="info-page_section">
            <h2>Nasza misja</h2>
          <p>
            Naszą misją jest dostarczanie wysokiej jakości sprzętu gamingowego, który podnosi doświadczenie graczy na każdym poziomie zaawansowania.
            Od casualowych użytkowników po profesjonalnych e-sportowców — mamy coś dla każdego.
          </p>

            <h2>Co nas wyróżnia</h2>
            <ul>
            <li><strong>Wysoka jakość:</strong> Starannie selekcjonowany asortyment od renomowanych producentów</li>
            <li><strong>Kompetentne doradztwo:</strong> Nasz zespół zawsze gotów pomóc w wyborze sprzętu</li>
            <li><strong>Szybka dostawa:</strong> Niezawodne i szybkie dostarczanie zamówień</li>
            <li><strong>Gwarancja zadowolenia:</strong> Jesteśmy pewni jakości naszych produktów</li>
          </ul>

            <h2>Kontakt z nami</h2>
          <p>
            Masz pytania? Z chęcią odpowiemy na wszystkie Twoje wiadomości.
            Skontaktuj się z nami poprzez <a href="/contact">formularz kontaktowy</a>.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
