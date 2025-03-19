const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const serverURL = "http://localhost:3001"
const app = express();
const dbPath = path.resolve(__dirname, "Marketplace_DB.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Fehler beim Verbinden zur SQLite-Datenbank:", err.message);
    return;
  }
  console.log("Erfolgreich mit der SQLite-Datenbank verbunden");
});

// Middleware zum Parsen von JSON aus requests
app.use(express.json());






// Route für Flagge von Währung
const currencyToIso = {
  eur: "eu",
  usd: "us",
  gbp: "gb",
  jpy: "jp",
  krw: "kr",
  cny: "cn",
  mxn: "mx",
};

// API-Endpunkt, der den ISO-Code basierend auf der Währung zurückgibt
app.get("/api/get-flag", (req, res) => {
  const { currency } = req.query;

  if (!currency || !currencyToIso[currency]) {
    return res
      .status(400)
      .json({ success: false, message: "Ungültige Währung!" });
  }

  // ISO-Code für die Währung finden
  const isoCode = currencyToIso[currency];
  const flagUrl = `https://flagcdn.com/w320/${isoCode}.png`;

  res.status(200).json({ success: true, isoCode, flagUrl });
});

//Route um Währung umzurechnen
const FILE_PATH = path.join(__dirname, "exchange_rates.json");

const currencySymbols = {
  eur: "€",
  usd: "$",
  gbp: "£",
  jpy: "¥",
  krw: "₩",
  cny: "¥",
  mxn: "MX$",
};

async function getExchangeRate(targetCurrency) {
  const baseCurrency = "eur"; // Setze die Base-Währung immer auf "eur"

  try {
    console.log("Lese Wechselkurse aus der lokalen Datei.");
    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));

    if (!data[baseCurrency] || !data[baseCurrency][targetCurrency]) {
      throw new Error(
        `Wechselkurs für ${baseCurrency} -> ${targetCurrency} nicht gefunden.`
      );
    }

    return data[baseCurrency][targetCurrency];
  } catch (error) {
    console.error("Fehler in getExchangeRate:", error);
    return null;
  }
}

app.get("/api/currency", async (req, res) => {
  console.log("🔄 Anfrage erhalten:", req.query);

  const { targetCurrency } = req.query;
  if (!targetCurrency) {
    return res
      .status(400)
      .json({ success: false, message: "⚠️ Fehlende Parameter!" });
  }

  const rate = await getExchangeRate(targetCurrency);
  if (rate === null) {
    return res.status(500).json({
      success: false,
      message:
        "Fehler beim Abrufen des Wechselkurses. Keine Daten in der Datei.",
    });
  }

  const currencySymbol =
    currencySymbols[targetCurrency.toLowerCase()] ||
    targetCurrency.toUpperCase();

  res.status(200).json({
    success: true,
    rate,
    currencySymbol,
  });
});

app.get("/api/login",(req,res)=>{
  getlogin(req,res).then(data=>{
    res.status(200).json(data.json)
  })
})


//USERS
async function getlogin(req,res) {
  try {
    const response = await fetch(serverURL+"/login",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten: '+ response.json().error);

    const data = await response.json();
    
    userID = data.userId;

    setLoggedIn(true);

    return true;

  } catch (error) {
    console.error('Fehler:', error);
    return false; 
  }
}
app.post('/api/register', (req, res) =>{
setRegister(req,res).then(data=>{
  setRegister(req,res).then(data=>{
    res.status(200).json(data.json)
  })
})


})

async function setRegister(req,res) {
  try {
    const response = await fetch(serverURL+"/register",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten: ' + response.json().error);

    const data = await response.json(); // JSON-Daten extrahieren
    
    userID = data.userId;
    
    setLoggedIn(true);

    return true;

  } catch (error) {
    console.error('Fehler:', error);
    return false; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

//ARTSEARCH
app.get("/api/articles", (req, res) => {
  getarticles(req, res).then(data=>{
    res.status(200).json(data);
  })
})

async function getarticles(req, res) {
  try {
    const response = await fetch(serverURL+"/articles"); 
    
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten: ');

    const data = await response.json(); // JSON-Daten extrahieren
    return data; // Rückgabe der JSON-Objekte als Liste
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}






// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
