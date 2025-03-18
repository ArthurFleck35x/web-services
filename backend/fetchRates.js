const fs = require("fs");
const path = require("path");

const CURRENCIES = ["eur", "usd", "gbp", "jpy", "krw", "cny", "mxn"];
const API_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const FILE_PATH = path.join(__dirname, "exchange_rates.json");

// Wechselkurse abrufen und speichern
async function fetchExchangeRates() {
  console.log("🔄 Starte Abruf der Wechselkurse...");
  const exchangeRates = {};

  for (const base of CURRENCIES) {
    try {
      const url = `${API_URL}${base}.json`; // Template Literal korrekt verwendet
      console.log(`🌍 Abruf von: ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `API-Fehler ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      exchangeRates[base] = {};

      CURRENCIES.forEach((currency) => {
        if (currency !== base && data[base]?.[currency]) {
          exchangeRates[base][currency] = data[base][currency];
        }
      });
    } catch (error) {
      console.error(`Fehler für ${base}:`, error.message);
    }
  }

  // JSON speichern
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(exchangeRates, null, 2));
    console.log(`Wechselkurse gespeichert in: ${FILE_PATH}`);
  } catch (error) {
    console.error("Fehler beim Speichern der JSON-Datei:", error.message);
  }
}

// Direkt ausführen
fetchExchangeRates();

// Alle 60 Minuten erneut ausführen
setInterval(fetchExchangeRates, 3600000);
