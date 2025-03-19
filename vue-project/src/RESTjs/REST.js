const serverURL = "/api";

var userID=1;

var currencyRate = 1;

var loggedIn = false;

var flagURL = "";

export function isLoggedIn(){
  return loggedIn;
}

export function setLoggedIn(state){
  loggedIn = state;
}

export function getCurrencyRate(){
  return currencyRate;
}

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
      const response = await fetch(serverURL+"/searcharticles?searchstring=" + encodeURIComponent(searchstring),{
        method: "GET",
        headers: {"Content-Type": "application/json"},
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
      const response = await fetch(serverURL+"/myarticles?userID="+encodeURIComponent(userID),{
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }); // Beispiel-API
      if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
  
      const data = await response.json(); // JSON-Daten extrahieren
      return data; // Rückgabe der JSON-Objekte als Liste
    } catch (error) {
      console.error('Fehler:', error);
      return []; // Rückgabe einer leeren Liste im Fehlerfall
    }
}

export async function checkLoginData(email,username,password) {
  try {
    const response = await fetch(serverURL+"/login",{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    
    return data;

  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function registerUser(email,username,password) {
  try {
    const response = await fetch(serverURL+"/register",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    
    return data;
    
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function fetchCurrencyRate(currency) {
  try {
    const response = await fetch(serverURL+"/currency?currency="+encodeURIComponent(currency),{
      method: "GET",
      headers: {"Content-Type": "application/json"},
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
    const response = await fetch(serverURL+"/flag?country="+encodeURIComponent(country),{
      method: "GET",
      headers: {"Content-Type": "application/json"},
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