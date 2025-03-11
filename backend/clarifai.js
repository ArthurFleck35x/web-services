import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // CORS-Paket importieren
const app = express();
const port = 3000;

// CORS aktivieren für alle Ursprünge (optional kannst du bestimmte Domains erlauben)
app.use(cors()); // Alle Ursprünge zulassen

// Middleware, um JSON-Daten zu verarbeiten
app.use(express.json());
app.use(express.static('public'));  // Statische Dateien (z.B. HTML-Seite)

// Deine API-Token und Modell-IDs
const PAT = '4ec97b3a5b9c4424b03c4c3766a6e429';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'general-image-recognition';
const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

// API-Endpunkt zum Hochladen eines Bildes und Anfordern der Bildanalyse
app.post('/analyze-image', async (req, res) => {
    const { imageUrl } = req.body; // Bild-URL aus der Anfrage

    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl // URL des Bildes
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    try {
        const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
        const result = await response.json();

        // Extrahiere nur relevante Daten: Kategorie und Wahrscheinlichkeit
        const outputs = result.outputs[0].data.concepts.map(concept => ({
            name: concept.name,
            value: concept.value
        }));

        res.json(outputs); // Rückgabe der gefilterten Daten
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the image' });
    }
});


// Server starten
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
