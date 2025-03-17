const serverURL = "";

var userID;

var currencyRate;

var flagURL;

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
        method: "GET",
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
        method: "GET",
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

export async function checkLoginData() {
  try {
    const response = await fetch(serverURL+"/login",{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    


  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function registerUser() {
  try {
    const response = await fetch(serverURL+"/register",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function fetchCurrencyRate(currency) {
  try {
    const response = await fetch(serverURL+"/currency",{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(currency),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren

  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function fetchFlagURL(country) {
  try {
    const response = await fetch(serverURL+"/flag",{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(country),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
        flagURL = data.flagURL;
        return flagURL;
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function createNewArticle() {
  try {
    const response = await fetch(serverURL+"/newarticle",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function updateArticle() {
  try {
    const response = await fetch(serverURL+"/updatearticle",{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren

  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function deleteArticle() {
  try {
    const response = await fetch(serverURL+"/deletearticle",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren

  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}