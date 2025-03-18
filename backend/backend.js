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
app.get("/api/myarticles", (req, res) => {
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
app.get('/api/searcharticles', (req, res) => {
    const { searchstring } = req.query; // Suchbegriff aus der Anfrage
    
    if (!searchstring) {
        return res.status(400).json({ error: 'Suchstring muss angegeben werden' });
    }

    const query = "SELECT * FROM artikel WHERE title LIKE ? OR description LIKE ?";

    db.all(query, [`%${searchstring}%`, `%${searchstring}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Abrufen der Artikel' });
        }
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Keine Artikel gefunden' });
        }
        res.status(500).json(rows);
    });
});


// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
