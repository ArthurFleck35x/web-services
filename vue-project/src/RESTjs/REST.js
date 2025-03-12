const serverURL = ""

var userID

export async function fetchArticles() {
    try {
      const response = await fetch(serverURL+"/articles"); // Beispiel-API
      if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
  
      const data = await response.json(); // JSON-Daten extrahieren
      return data; // Rückgabe der JSON-Objekte als Liste
    } catch (error) {
      console.error('Fehler:', error);
      return []; // Rückgabe einer leeren Liste im Fehlerfall
    }
}

export async function fetchSearchArticles(searchstring) {
    try {
      const response = await fetch(serverURL+"/searcharticles",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchstring),
      }); // Beispiel-API

      if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
  
      const data = await response.json(); // JSON-Daten extrahieren
      return data; // Rückgabe der JSON-Objekte als Liste
    } catch (error) {
      console.error('Fehler:', error);
      return []; // Rückgabe einer leeren Liste im Fehlerfall
    }
}

export async function fetchMyArticles() {
    try {
      const response = await fetch(serverURL+"/myarticles",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userID),
      }); // Beispiel-API
      if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
  
      const data = await response.json(); // JSON-Daten extrahieren
      return data; // Rückgabe der JSON-Objekte als Liste
    } catch (error) {
      console.error('Fehler:', error);
      return []; // Rückgabe einer leeren Liste im Fehlerfall
    }
}