const express = require('express'); 
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

async function getExchangeRate(baseCurrency, targetCurrency) {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`;
    try {
        console.log(`Fetching: ${url}`);
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

    const rate = await getExchangeRate(baseCurrency, targetCurrency);
    if (rate === null) {
        return res.status(500).json({ success: false, message: '❌ Fehler beim Abrufen des Wechselkurses. API antwortet nicht oder fehlerhafte Daten.' });
    }

    const convertedAmount = amount * rate;
    res.json({ success: true, rate, convertedAmount });
});

app.listen(port, () => {
    console.log(`🚀 Server läuft auf http://localhost:${port}`);
});
