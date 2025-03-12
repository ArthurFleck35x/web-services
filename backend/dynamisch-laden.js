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

// API zum Abrufen der Artikel
app.get('/api/articles', (req, res) => {
    db.all('SELECT * FROM artikel', (err, results) => {
        if (err) {
            res.status(500).json({ error: '❌ Fehler beim Abrufen der Artikel' });
        } else {
            res.json(results);
        }
    });
});

// Currency exchange
async function getExchangeRate(baseCurrency, targetCurrency) {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`;
    try {
        console.log(`Fetching exchange rate from: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API-Fehler: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data[baseCurrency] || !data[baseCurrency][targetCurrency]) {
            throw new Error(`Ungültige API-Antwort: ${JSON.stringify(data)}`);
        }

        return data[baseCurrency][targetCurrency];
    } catch (error) {
        console.error('Fehler in getExchangeRate:', error);
        return null;
    }
}


app.post('/api/exchange-rate', async (req, res) => {
    console.log('🔄 Anfrage erhalten:', req.body);

    const { baseCurrency, targetCurrency, amount } = req.body;
    if (!baseCurrency || !targetCurrency || !amount) {
        return res.status(400).json({ success: false, message: '⚠️ Fehlende Parameter!' });
    }

    try {
        const rate = await getExchangeRate(baseCurrency, targetCurrency);
        if (rate === null) {
            return res.status(500).json({ success: false, message: '❌ Fehler beim Abrufen des Wechselkurses. API antwortet nicht oder fehlerhafte Daten.' });
        }

        const convertedAmount = amount * rate;
        res.json({ success: true, rate, convertedAmount });
    } catch (error) {
        console.error('Fehler bei der Anfrage für den Wechselkurs:', error);
        res.status(500).json({ success: false, message: '❌ Interner Serverfehler beim Abrufen des Wechselkurses.' });
    }
});


app.listen(port, () => {
    console.log(`🚀 Server läuft auf http://localhost:${port}`);
});
