const serverURL = "/api";

var userID=1;

var currencyRate = 1;

var loggedIn = false;

var flagURL = "";

var myCurrency = "eur"

var myCurrencySymbol = "€"

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

    myCurrency = currency;



  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function fetchFlagURL() {
  try {
    const response = await fetch(serverURL+"/get-flag?currency="+encodeURIComponent(myCurrency),{
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    flagURL = data.flagUrl;
    return flagURL;
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function createNewArticle(title,price,count,description) {
  try {
    const response = await fetch(serverURL+"/newarticle",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "title": title,
        "price": price,
        "count": count,
        "description": description,
        "userID": userID,
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren
    
  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function updateArticle(product) {
  try {
    const response = await fetch(serverURL+"/updatearticle",{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "price": product.price,
        "count": product.count,
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren

  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

export async function deleteArticle(id) {
  try {
    const response = await fetch(serverURL+"/deletearticle",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "id": id
      }),
    }); // Beispiel-API
    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json(); // JSON-Daten extrahieren

  } catch (error) {
    console.error('Fehler:', error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}