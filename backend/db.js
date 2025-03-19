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

//ARTICLE SEARCH
app.get("/api/searcharticles", (req, res) => {
  const { searchstring } = req.query; 

  if (!searchstring) {
    return res.status(400).json({ error: "Suchstring muss angegeben werden" });
  }


  const query = `
    SELECT artikel.*, user.email 
    FROM artikel
    JOIN user ON artikel.user_id = user.user_id
    WHERE artikel.title LIKE ? OR artikel.description LIKE ?
  `;

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

// PROFILE DB
app.get("/api/myarticles", (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ error: "userID muss angegeben werden" });
  }

  const query = `
    SELECT artikel.*, user.email
    FROM artikel
    JOIN user ON artikel.user_id = user.user_id
    WHERE user.user_id=?
  `;

  db.all(query, [userID], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
      return;
    }
    res.status(200).json(rows);
  });
});

//ALL_ARTICLES DB
app.get("/api/articles", (req, res) => {
  
  const query = `
    SELECT artikel.*, user.email
    FROM artikel
    JOIN user ON artikel.user_id = user.user_id
  `;

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
  const { userID, title, price, count, description } = req.body;

  if (!userID || !title || !description || !price || !count) {
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
    [userID, title, description, price, count, created_at],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Fehler beim Einfügen des Artikels" });
      }
      res.status(201).json({
        message: "Artikel erfolgreich hinzugefügt",
        articleId: this.lastID,
      });
    }
  );
});

//ITEM DELEITION
app.delete('/api/deletearticle', (req, res) => {
  const { id } = req.body; // Artikel-ID aus dem Body extrahieren

  if (!id) {
      return res.status(400).json({ error: 'Artikel-ID erforderlich' });
  }

  const query = `DELETE FROM artikel WHERE id = ?`;

  db.run(query, [id], function (err) {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Löschen des Artikels' });
      }
      if (this.changes === 0) {
          return res.status(404).json({ error: 'Artikel nicht gefunden' });
      }

      res.status(200).json({ message: 'Artikel erfolgreich gelöscht' });
  });
});
//update ITEM
app.put('/api/updatearticle', (req, res) => {
  const { id, title, description, price, count } = req.body;

  if (!id || !title || !description || !price || !count) {
      return res.status(400).json({ error: 'Alle Felder müssen ausgefüllt sein' });
  }

  const query = `
      UPDATE artikel 
      SET title = ?, description = ?, price = ?, count = ?, created_at = ?
      WHERE id = ?
  `;

  const created_at = new Date().toISOString(); // Neuen Zeitstempel setzen

  db.run(query, [title, description, price, count, created_at, id], function (err) {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Aktualisieren des Artikels' });
      }
      if (this.changes === 0) {
          return res.status(404).json({ error: 'Artikel nicht gefunden' });
      }

      res.status(200).json({ message: 'Artikel erfolgreich aktualisiert' });
  });
});


//USERS
//LOGIN
app.post('/api/login', (req, res) => {
  const { email, username, password } = req.body; // Daten aus dem Body extrahieren

  if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, Benutzername und Passwort erforderlich' });
  }

  const query = `SELECT * FROM user WHERE email = ? AND username = ?`;

  db.get(query, [email, username], (err, user) => {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Abrufen der Benutzerdaten' });
      }
      if (!user) {
          return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
      }

      if(password==user.password){
        res.status(200).json({ message: 'Login erfolgreich', userId: user.user_id });
      }else{
        return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
      }
  });
});
//REGISTER USER
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Überprüfen, ob alle Felder vorhanden sind
  if (!username || !email || !password) {
      return res.status(400).json({ error: 'Benutzername, E-Mail und Passwort sind erforderlich' });
  }

  // Überprüfen, ob die E-Mail bereits existiert
  const checkQuery = 'SELECT * FROM user WHERE email = ? OR username = ?';
  db.get(checkQuery, [email,username], (err, row) => {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Überprüfen der E-Mail und des Benutzernamen' });
      }
      if (row) {
          return res.status(400).json({ error: 'E-Mail/Benutzername ist bereits registriert' });
      }

      // Neuen Benutzer in die Datenbank einfügen (Passwort ist bereits gehasht)
      const insertQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
      db.run(insertQuery, [username, email, password], function (err) {
          if (err) {
              return res.status(500).json({ error: 'Fehler beim Registrieren des Benutzers' });
          }
          res.status(201).json({ message: 'Benutzer erfolgreich registriert', userId: this.lastID });
      });
  });
});

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

