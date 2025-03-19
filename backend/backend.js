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

// SEARCH DB
app.get('/api/searcharticles', (req, res) => {
    const { searchstring } = req.query; 
    
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

//ALL_ARTICLES DB
app.get('/api/articles', (req, res) => {
  const query = "SELECT * FROM artikel";

  db.all(query, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Abrufen der Artikel' });
      }
      if (!rows || rows.length === 0) {
          return res.status(404).json({ error: 'Keine Artikel gefunden' });
      }
      res.status(200).json(rows);
  });
});

//ARTIKEL CREATION
app.post('/api/newarticle', (req, res) => {
  const { id, user_id, title, description, price, category, count, currency } = req.body;

  if (!id || !user_id || !title || !description || !price || !category || !count || !currency) {
      return res.status(400).json({ error: 'Alle Felder müssen ausgefüllt sein' });
  }

  const created_at = new Date().toISOString();

  const query = `
      INSERT INTO artikel (id, user_id, title, description, price, category, created_at, count, currency) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [id, user_id, title, description, price, category, created_at, count, currency], function (err) {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Einfügen des Artikels' });
      }
      res.status(201).json({ message: 'Artikel erfolgreich hinzugefügt', articleId: this.lastID });
  });
});





// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
