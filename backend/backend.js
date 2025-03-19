const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

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

// PROFILE DB
app.get("/api/myarticles", (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ error: "userID muss angegeben werden" });
  }

  const query = "SELECT * FROM artikel WHERE user_id = ?";

  db.all(query, [userID], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
      return;
    }
    res.json(rows);
  });
});

// Route zum Abrufen eines bestimmten Artikels anhand der Artikel-ID
app.get("/api/searcharticles", (req, res) => {
  const { searchstring } = req.query; // Suchbegriff aus der Anfrage

  if (!searchstring) {
    return res.status(400).json({ error: "Suchstring muss angegeben werden" });
  }

  const query =
    "SELECT * FROM artikel WHERE title LIKE ? OR description LIKE ?";

  db.all(query, [`%${searchstring}%`, `%${searchstring}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Keine Artikel gefunden" });
    }
    res.status(200).json(rows);
  });
});

//ALL_ARTICLES DB
app.get("/api/articles", (req, res) => {
  const query = "SELECT * FROM artikel";

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Keine Artikel gefunden" });
    }
    res.status(200).json(rows);
  });
});

//ARTIKEL CREATION
app.post("/api/newarticle", (req, res) => {
  const { user_id, title, description, price, count } = req.body;

  if (!user_id || !title || !description || !price || !count) {
    return res
      .status(400)
      .json({ error: "Alle Pflichtfelder müssen ausgefüllt sein" });
  }

  const created_at = new Date().toISOString();

  const query = `
      INSERT INTO artikel (user_id, title, description, price, count, created_at) 
      VALUES (?, ?, ?, ?, ?, ?)
      `;

  db.run(
    query,
    [user_id, title, description, price, count, created_at],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Fehler beim Einfügen des Artikels" });
      }
      res
        .status(201)
        .json({
          message: "Artikel erfolgreich hinzugefügt",
          articleId: this.lastID,
        });
    }
  );
});

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
app.post("/api/get-flag", (req, res) => {
  const { currency } = req.body;

  if (!currency || !currencyToIso[currency]) {
    return res
      .status(400)
      .json({ success: false, message: "Ungültige Währung! " });
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
    console.log("Lese Wechselkurse aus der lokalen Datei...");
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

app.post("/currency", async (req, res) => {
  console.log("🔄 Anfrage erhalten:", req.body);

  const { targetCurrency, amount } = req.body;
  if (!targetCurrency || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "⚠️ Fehlende Parameter!" });
  }

  const rate = await getExchangeRate(targetCurrency);
  if (rate === null) {
    return res.status(500).json({
      success: false,
      message:
        "❌ Fehler beim Abrufen des Wechselkurses. Keine Daten in der Datei.",
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

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
