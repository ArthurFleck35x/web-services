# UniPlace 

**INF 23 B, Semester 4**  
Prof. Dr. Alexander Auch  
30.03.2025  

**Dennis Pinder** (9930287)
<br>
**Lea Liedtke** (3260935)  
**Recep Özmen** (4302297)  
**Sven Niggemann** (8466840)  

## Einleitung

Uniplace ist ein innovativer, webbasierter Marktplatz, der es Nutzern ermöglicht, Artikel anzubieten, zu suchen und zu verwalten. Die Plattform richtet sich insbesondere an Studierende und andere Nutzergruppen, die auf einfache Weise Waren und Dienstleistungen austauschen möchten. Ein zentrales Feature von Uniplace ist die Möglichkeit, als Kunde ein eigenes Konto zu erstellen, sich einzuloggen und auf alle Funktionen des Marktplatzes zuzugreifen.

Die Benutzer können gezielt nach Produkten suchen und sich die Kontaktdaten der jeweiligen Anzeigenersteller direkt in der Produktbeschreibung anzeigen lassen. Zudem haben sie die Möglichkeit, eigene Artikel zum Verkauf oder Tausch anzubieten, bestehende Angebote zu bearbeiten oder zu löschen.

Ein herausragendes Merkmal von Uniplace ist die Unterstützung von sieben verschiedenen Währungen (EUR, USD, GBP, JPY, KRW, CNY, MXN), sodass internationale Transaktionen vereinfacht werden. Durch diese Funktion wird die Plattform für eine größere Nutzerbasis attraktiv, insbesondere für Personen, die grenzüberschreitend handeln oder in unterschiedlichen Währungen bezahlen möchten.

Neben den grundlegenden Marktplatzfunktionen setzt Uniplace auf eine benutzerfreundliche Oberfläche und ein intuitives Design, um eine nahtlose User Experience zu gewährleisten. Die Plattform bietet zudem Mechanismen zur Sicherstellung von Datenschutz und Sicherheit der Nutzerinformationen.

Im Rahmen dieses Projekts wurden verschiedene technische Aspekte realisiert, darunter die Einrichtung der Datenbank, die Integration externer APIs und die Automatisierung von Wechselkurs-Updates. Diese Dokumentation beschreibt die einzelnen Schritte der Entwicklung und Implementierung der zentralen Funktionen von Uniplace.

## Projektorganisation
|Dennis Pinder|Lea Liedtke|Recep Özmen|Sven Niggemann|
|-------------|-----------|-----------|--------------|
|**Debugging-Support** <br> - Unterstützung bei Fehleranalysen im Backend <br> <br> **Deployment** <br> - hosting Plane Tool als Organisationstool auf Portainer  <br> - Gesamtes Deployment auf Portainer <br> <br> **API**  <br> - Implementierung DB-API  <br> <br> **Backend**  <br> - Backend Planung|**Organisation** <br> - Trennung von Verantwortlichkeiten <br> <br> **Issue Management** <br> - Erstellen von Issues zur groben Planung/ Aufgabenverteilung <br> - Priorisierung <br> - Identifizierung von Abhängigkeiten <br> <br> **Erstellung von Wireframes/ Images** <br>  - Image und Logo Erstellung mit Canva <br> - Skizzieren des Anwendungsablaufs/ Benutzerinteraktionsmuster als Referenzmodell <br> <br> **Frontendentwicklung**  <br> - Unternehmensinfoseite mit Gradient-Styling und SVG-Icons <br> - Währungsauswahlkomponente mit dynamischer Wechselkursfunktionalität <br> - Benutzerregistrierungsformular mit Validierung und sicherer Passwortverarbeitung <br> - Benutzeranmeldeformular mit Validierung und sicherer Passwortverarbeitung <br> - Fußzeilenkomponente mit Navigation <br> - Konsistentes Styling <br> - Dynamische Jahr-Anzeige im Footer <br> - Logik-Implementierung <br> <br> **Debugging-Support** <br> - Unterstützung bei Fehleranalysen im Frontend  |**Einrichtung der Datenbank** <br> - Installation und Konfiguration des DBMS - Erstellung der Tabellen und Datenstrukturen - Bereitstellung der Datenbank für das Projekt <br> <br> **Backend-Schnittstellen für externe APIs bereitgestellt** <br> - Implementierung der Schnittstelle für die Flag-API <br> - Implementierung der Schnittstelle für die Currency-API <br><br> **Automatisiertes Skript zur Aktualisierung der Wechselkurse** <br> - Stündlicher Abruf der Wechselkurse von der Currency-API <br> - Speicherung der Daten in einer JSON <br> - Fehlerhandling bei API-Ausfällen <br><br> **Debugging-Support** <br> - Unterstützung bei Fehleranalysen im Backend |**Debugging-Support** <br> - Unterstützung bei Fehleranalysen im Frontend & Backend <br><br> **Backend-Support** <br> - Einsetzen von Request Forwarding um Database abzusondern <br><br> **BPMN** <br> - Erstellung eines BPMN-Diagramms als Planungshilfe <br> - Aktualisierung des Diagramms <br><br> **Schnittstellen Management** <br> - Definition von Schnittstellen zwischen Frontend und Backend <br> - Testen der Schnittstellen <br><br> **Frontend Entwicklung** <br> - Erstellung der zentralen Logik zum Austausch mit Backend <br> - Einbindung der Logik in die Views <br> - Einbindung der Router Logik im Frontend |


## Systemarchitektur

![Architektur](https://github.com/user-attachments/assets/5490a395-9f83-47ac-8b23-4040b8fbdf20)

Technologiestack:

* Backend: JavaScript, Node.js, Express, SQLite

* Frontend: Vue.js, HTML, CSS, JavaScript

*    Deployment: Docker Engine, Docker Desktop

*    Versionierung: GitHub, VSCode

Der Client (z. B. Browser, mobile App) kommuniziert über eine Web-API (HTTP, JSON) mit dem Backend in Node.js, das Anfragen verarbeitet und mit einer SQLite-Datenbank interagiert. Ein Flag-Mechanismus steuert bestimmte Funktionen. Externe Kommunikation erfolgt über eine Exchange API für Integrationen. Zusammengefasst handelt es sich um ein REST-API-System, das JSON und SQLite nutzt.


## Backendschnittstellen & API

Das Backend wurde mit Node.js und Express.js entwickelt, um eine schnelle und effiziente API bereitzustellen. Es organisiert die verschiedenen Funktionen der Anwendung in Bereiche wie Benutzerverwaltung, Artikelverwaltung und Externe APIs. Ein zusätzliches Skript aktualisiert stündlich eine JSON-Datei mit den aktuellen Währungsraten, die das Backend für die Currency API nutzt,
[siehe Swagger](https://app.swaggerhub.com/templates/webservice-c5f/dokumentation/1.0.2) .

### Benutzerverwaltung
* POST /login
  * Zweck: Diese Schnittstelle dient der Benutzeranmeldung. Sie überprüft die Anmeldedaten (E-Mail, Benutzername, Passwort) und stellt eine Benutzer-ID bereit, wenn die Anmeldung erfolgreich ist.
  * Funktion: Authentifizierung eines Benutzers.
 
* POST /register 
  * Zweck: Diese Schnittstelle ermöglicht die Registrierung eines neuen Benutzers. Sie nimmt E-Mail, Benutzernamen und Passwort entgegen und erstellt ein Benutzerkonto. Nach der Registrierung erfolgt automatisch das Einloggen des Benutzers. 
  * Funktion: Registrierung eines neuen Benutzers und automatische Anmeldung.
 
### Artikelverwaltung 

* GET /articles 

  * Zweck: Diese Schnittstelle gibt eine Liste aller verfügbaren Artikel zurück. Sie wird verwendet, um alle Artikel aus der Datenbank abzurufen. 

  * Funktion: Abrufen aller Artikel. 

 

* GET /searcharticles 

  * Zweck: Diese Schnittstelle ermöglicht die Suche nach Artikeln. Sie akzeptiert einen Suchbegriff (z.B. Titel oder Beschreibung) und gibt die entsprechenden Artikel zurück. 

  * Funktion: Suche nach Artikeln basierend auf einem Suchbegriff. 

 

* GET /myarticles 

  * Zweck: Diese Schnittstelle gibt alle Artikel zurück, die einem bestimmten Benutzer gehören. Der Benutzer wird anhand seiner Benutzer-ID identifiziert. 

  * Funktion: Abrufen der eigenen Artikel eines Benutzers. 

 
* POST /newarticle 

  * Zweck: Diese Schnittstelle wird verwendet, um einen neuen Artikel zu erstellen. Der Benutzer gibt die Artikeldaten (z. B. Titel, Preis, Menge, Beschreibung) an, und der Artikel wird in die Datenbank eingefügt. 

  * Funktion: Erstellen eines neuen Artikels. 

 
* PUT /updatearticle 

  * Zweck: Diese Schnittstelle ermöglicht es, die Daten eines bestehenden Artikels zu aktualisieren. Der Artikel wird anhand seiner ID identifiziert, und die neuen Daten werden in die Datenbank übernommen. 

  * Funktion: Aktualisieren eines Artikels. 


* DELETE /deletearticle 

  * Zweck: Diese Schnittstelle wird verwendet, um einen Artikel aus der Datenbank zu löschen. Der Artikel wird anhand seiner ID identifiziert und aus der Datenbank entfernt. 

  * Funktion: Löschen eines Artikels.
### Externe API 

* GET /currency 

  * Zweck: Diese Schnittstelle gibt den aktuellen Wechselkurs für eine angegebene Währung zurück. Der Client kann eine der unterstützten Währungen (z. B. EUR, USD, GBP) angeben, und die API liefert den entsprechenden Wechselkurs sowie das Währungssymbol. 

  * Funktion: Abrufen des aktuellen Wechselkurses und Währungssymbols. 

 
* GET /get-flag 

  * Zweck: Diese Schnittstelle gibt die URL der Flagge eines Landes zurück, die zur angegebenen Währung gehört. Der Client kann die Währung angeben (z. B. EUR für Euro), und die API gibt die URL der entsprechenden Flagge zurück. 

  * Funktion: Abrufen der URL der Flagge für eine angegebene Währung. 

## Datenbank 

### Datenbanktyp

Es wurde SQLite verwendet. Diese Entscheidung wurde aufgrund der Vorerfahrung des Teams sowie der einfachen Handhabung getroffen. Auch passt die Relationalität sehr gut zu unserem Anwendungsfall. 
![Struktur](https://github.com/user-attachments/assets/17004ae9-3ce0-4b81-aaf8-d4d79f62b1f5)

### Struktur

Die Datenbank besteht aus zwei Tabellen. Zum einen das Artikeltabellenblatt und zum anderen das Kundentabellenblatt. Die beiden sind als Besitzer und Besitz verbunden. 
Der Besitzer mit der "userid"  als Fremdschlüssel im Artikelvermerkt. 

## Frontend

### Übersicht

Das Frontend von UniPlace wurde mit Vue.js entwickelt und bietet eine benutzerfreundliche Oberfläche für den digitalen Marktplatz. Die Anwendung ermöglicht Benutzern das Erstellen eines Kontos, das Einstellen von Produkten zum Verkauf, den Kauf von Produkten und die Verwaltung ihrer eigenen Angebote.

### Technologie-Stack

- **Framework:** Vue.js 3
- **Router:** Vue Router
- **State Management:** Vue Event Bus
- **Styling:** CSS mit konsistenten Klassen (ähnlich zu Tailwind CSS-Konzepten)
- **HTTP-Requests:** REST.js (interne API-Wrapper-Bibliothek)
- **Verschlüsselung:** CryptoJS (für sichere Passwortverarbeitung)

### Komponenten-Struktur

#### Hauptkomponenten

1. **AboutUs.vue** - Informationsseite über UniPlace
2. **AddArticleView.vue** - Hinzufügen neuer Produkte
3. **App.vue** - Aufbaukomponente
4. **ArticleView.vue** - Anzeige aller verfügbaren Produkte
5. **Currency.vue** - Währungsauswahl und -umrechnung
6. **Footer.vue** - Fußzeile mit Navigation und Copyright
7. **LogIn.vue** - Benutzeranmeldung
8. **Market.vue** - Artikel und Suchzeile
9. **MyArticlesView.vue** - Verwaltung eigener Produkte
10. **NavBar.vue** - Navigation und Bürgermenü
11. **SearchBar.vue** -Suchzeile 
12. **SignUp.vue** - Benutzerregistrierung

### Design-System

UniPlace verwendet ein konsistentes Designsystem mit:

- Gradienthintergründen
- Einheitlichem Button-Styling
- Responsivem Layout
- Modalen Dialogen für Detailansichten
- Feedback-Meldungen für Benutzeraktionen

#### CSS-Klassen

```css
/* Dunklerer Hintergrund */
.bg-dark {
  background: linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568);
  color: white;
}

/* Spezieller Farbverlaufshintergrund */
.bg-special {
  background: linear-gradient(to left, #5cbbca, #c59bec);
  color: white;
  width: 100%;
  padding: 1rem;
}
```

### Kernfunktionen und Implementierungsbeispiele

#### 1. Benutzerregistrierung (SignUp.vue)

```javascript
const signUp = () => {
  if(!checkValues()){
    hashedPassword.value = CryptoJS.SHA256(username.value+password.value).toString(CryptoJS.enc.Hex);
    sendSignUpData()
  } else {
    errormessage.value = "Please input your data";
    openPopup();
  }
}
```

#### 2. Produktanzeige (ArticleView.vue)

```javascript
// Produktdetails anzeigen
function getDetails(product){
    certainProduct = product;
    isPopupVisible.value = true;
}
```

```html
<!-- Produktliste -->
<div class="product-item" v-for="product in products">
    <p class="product-field"><strong>Produkt:</strong> {{ product.title }}</p>
    <p class="product-field"><strong>Preis:</strong> {{ (product.price * currencyRate).toFixed(2) }} {{currencySymbol}}</p>
    <button class="detailButton" @click="getDetails(product)">Details</button>
</div>
```
