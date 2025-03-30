const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const serverURL = "http://localhost:3001"
const app = express();

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

  const { currency } = req.query;
  if (!currency) {
    return res
      .status(400)
      .json({ success: false, message: "⚠️ Fehlende Parameter!" });
  }

  const rate = await getExchangeRate(currency);
  if (rate === null) {
    return res.status(500).json({
      success: false,
      message:
        "Fehler beim Abrufen des Wechselkurses. Keine Daten in der Datei.",
    });
  }

  const currencySymbol =
    currencySymbols[currency.toLowerCase()] ||
    currency.toUpperCase();

  res.status(200).json({
    success: true,
    rate,
    currencySymbol,
  });
});


app.post("/api/login", async (req, res) => {
  try {
    console.log("🔁 Weiterleitung an 3001: Login-Versuch", req.body);

    const response = await fetch(serverURL+"/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("✅ Login erfolgreich:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});


app.post("/api/register", async (req, res) => {
  try {
    console.log("🔁 Weiterleitung an 3001: Registrierung", req.body);

    const response = await fetch(serverURL+"/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("✅ Registrierung erfolgreich:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});

//ARTSEARCH
app.get("/api/articles", async (req, res) => {
  try {
    const response = await fetch(serverURL+"/articles");

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log(`✅ Antwort von 3001 erhalten: ${data.length} Artikel gefunden.`);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.get("/api/searcharticles", async (req, res) => {
  const { searchstring } = req.query;

  if (!searchstring) {
    return res.status(400).json({ error: "Suchstring muss angegeben werden" });
  }

  try {
    console.log("🔁 Forwarding request to 3001: searchstring =", searchstring);

    const response = await fetch(serverURL+`/searcharticles?searchstring=${encodeURIComponent(searchstring)}`);

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("✅ Antwort von 3001 erhalten:", data.length, "Artikel gefunden");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.get("/api/myarticles", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ error: "userID muss angegeben werden" });
  }

  try {
    console.log("🔁 Weiterleitung an 3001: userID =", userID);

    const response = await fetch(serverURL+`/myarticles?userID=${encodeURIComponent(userID)}`);

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log(`✅ Antwort von 3001 erhalten: ${data.length} Artikel gefunden.`);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});

//Article edit
app.post("/api/newarticle", async (req, res) => {
  try {
    console.log("🔁 Weiterleitung an 3001: Artikel wird erstellt", req.body);

    const response = await fetch(serverURL+"/newarticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("✅ Artikel erfolgreich erstellt:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.delete("/api/deletearticle", async (req, res) => {
  try {
    console.log("🔁 Weiterleitung an 3001: Artikel wird gelöscht", req.body);

    const response = await fetch(serverURL+"/deletearticle", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("✅ Artikel erfolgreich gelöscht:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});

app.put("/api/updatearticle", async (req, res) => {
  try {
    console.log("🔁 Weiterleitung an 3001: Artikel wird aktualisiert", req.body);

    const response = await fetch(serverURL+"/updatearticle", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("✅ Artikel erfolgreich aktualisiert:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Fehler beim Weiterleiten:", error);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
});


// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
