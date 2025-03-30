const fs = require("fs");
const path = require("path");

const CURRENCIES = ["usd", "gbp", "jpy", "krw", "cny", "mxn"]; // Nur Zielwährungen (ohne eur)
const API_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const FILE_PATH = path.join(__dirname, "exchange_rates.json");

// Wechselkurse abrufen und speichern
async function fetchExchangeRates() {
  console.log("Starte Abruf der Wechselkurse...");
  const exchangeRates = {
    eur: {}, // Wir speichern nur den Wechselkurs von Euro zu den anderen Währungen
  };

  try {
    // Wechselkurs für EUR abrufen
    const url = `${API_URL}eur.json`; // Wir holen nur die Wechselkurse von EUR zu den anderen Währungen
    console.log(`🌍 Abruf von: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API-Fehler ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Nur für die anderen Währungen aus der CURRENCIES-Liste die Kurse speichern
    CURRENCIES.forEach((currency) => {
      if (data.eur?.[currency]) {
        exchangeRates.eur[currency] = data.eur[currency];
      }
    });

    // JSON speichern
    try {
      fs.writeFileSync(FILE_PATH, JSON.stringify(exchangeRates, null, 2));
      console.log(`Wechselkurse gespeichert in: ${FILE_PATH}`);
    } catch (error) {
      console.error("Fehler beim Speichern der JSON-Datei:", error.message);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Wechselkurse:", error.message);
  }
}

// Direkt ausführen
fetchExchangeRates();

// Alle 60 Minuten erneut ausführen
setInterval(fetchExchangeRates, 3600000);
