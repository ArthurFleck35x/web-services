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

// Route zum Abrufen der Artikel eines bestimmten Nutzers
app.get("/myarticles", (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId muss angegeben werden" });
  }

  const query = "SELECT * FROM artikel WHERE user_id = ?";

  db.all(query, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
      return;
    }
    res.json(rows);
  });
});

// Route zum Abrufen eines bestimmten Artikels anhand der Artikel-ID
app.get("/searcharticle/:id", (req, res) => {
  const { id } = req.params; // ID aus der URL entnehmen

  if (!id) {
    return res.status(400).json({ error: "Artikel-ID muss angegeben werden" });
  }

  const query = "SELECT * FROM artikel WHERE id = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Fehler beim Abrufen des Artikels" });
      return;
    }
    if (!row) {
      return res.status(404).json({ error: "Artikel nicht gefunden" });
    }
    res.json(row);
  });
});

// Route um Währungen umzurechnen (nur für von eur zu USD, GBP, JPY, KRW, CNY, MXN)
const FILE_PATH = path.join(__dirname, "exchange_rates.json");

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

  const { targetCurrency, amount } = req.body; // baseCurrency wird nicht mehr benötigt
  if (!targetCurrency || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "⚠️ Fehlende Parameter!" });
  }

  // Statt baseCurrency zu übergeben, verwenden wir "eur" direkt
  const rate = await getExchangeRate(targetCurrency);
  if (rate === null) {
    return res.status(500).json({
      success: false,
      message:
        "❌ Fehler beim Abrufen des Wechselkurses. Keine Daten in der Datei.",
    });
  }

  const convertedAmount = amount * rate;
  res.json({ success: true, rate, convertedAmount });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
