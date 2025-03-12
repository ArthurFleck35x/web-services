const express = require('express'); 
const cors = require('cors'); 
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

const dbPath = path.resolve(__dirname, 'Marketplace_DB.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Fehler beim Verbinden zur SQLite-Datenbank:', err.message);
    return;
  }
  console.log('✅ Erfolgreich mit der SQLite-Datenbank verbunden');
});

// API für USER

// 🔹 Login-Route (POST /login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email und Passwort erforderlich' });
  }

  db.get('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, user) => {
    if (err) {
      console.error('❌ SQL-Fehler:', err.message);
      return res.status(500).json({ success: false, message: 'Serverfehler bei der Datenbankabfrage' });
    }

    if (user) {
      res.json({ success: true, message: '✅ Login erfolgreich!' });
    } else {
      res.json({ success: false, message: '❌ Falsche Anmeldedaten' });
    }
  });
});

// 🔹 Benutzer registrieren
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'Alle Felder erforderlich' });
  }

  db.run('INSERT INTO user (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err) => {
    if (err) {
      console.error('❌ Fehler beim Registrieren:', err.message);
      return res.status(500).json({ success: false, message: 'Fehler beim Registrieren' });
    }
    res.json({ success: true, message: '✅ Registrierung erfolgreich!' });
  });
});

// 🔹 Passwort ändern
app.post('/change-password', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Alle Felder erforderlich' });
  }

  db.get('SELECT * FROM user WHERE username = ? AND password = ?', [username, oldPassword], (err, user) => {
    if (err) {
      console.error('❌ SQL-Fehler:', err.message);
      return res.status(500).json({ success: false, message: 'Serverfehler bei der Datenbankabfrage' });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: '❌ Falsches altes Passwort' });
    }

    db.run('UPDATE user SET password = ? WHERE username = ?', [newPassword, username], (err) => {
      if (err) {
        console.error('❌ Fehler beim Aktualisieren des Passworts:', err.message);
        return res.status(500).json({ success: false, message: 'Fehler beim Ändern des Passworts' });
      }
      res.json({ success: true, message: '✅ Passwort erfolgreich geändert' });
    });
  });
});


// 🔹 Benutzer löschen
app.post('/delete-user', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Benutzername und Passwort erforderlich' });
  }

  db.get('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err) {
      console.error('❌ SQL-Fehler:', err.message);
      return res.status(500).json({ success: false, message: 'Serverfehler bei der Datenbankabfrage' });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: '❌ Benutzer nicht gefunden oder falsches Passwort' });
    }

    db.run('DELETE FROM user WHERE username = ?', [username], (err) => {
      if (err) {
        console.error('❌ Fehler beim Löschen des Benutzers:', err.message);
        return res.status(500).json({ success: false, message: 'Fehler beim Löschen des Benutzers' });
      }
      res.json({ success: true, message: '✅ Benutzer erfolgreich gelöscht' });
    });
  });
});

//API für artikel

// Abrufen der Artikel
app.get('/api/articles', (req, res) => {
  db.all('SELECT * FROM artikel', (err, results) => {
      if (err) {
          res.status(500).json({ error: '❌ Fehler beim Abrufen der Artikel' });
      } else {
          res.json(results);
      }
  });
});

// Artikel löschen

app.post('/delete-article', (req, res) => {
  const { articleid} = req.body;

    db.run('DELETE FROM artikel WHERE id = ?', [articleid], (err) => {
      if (err) {
        console.error('❌ Fehler beim Löschen des Benutzers:', err.message);
        return res.status(500).json({ success: false, message: 'Fehler beim Löschen des Artikels' });
      }
      res.json({ success: true, message: '✅ Artikel erfolgreich gelöscht' });
    });
});


app.listen(port, () => {
    console.log(`🚀 Server läuft auf http://localhost:${port}`);
});
