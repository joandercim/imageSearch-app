# Bildsökningsapp

ImageSearch - en inlämningsuppgift skapad som en del i utbildningen Fullstack Developer på Medieinstitutet. Denna app låter användare söka efter bilder via Google Custom Search API, visa resultat, och spara sina favoritbilder. Autentisering hanteras med Auth0.

## Teknikstack

- **Frontend:** React, TypeScript
- **Backend:** Node.js
- **Tredjepartssystem:** Google Custom Search API, Auth0
- **Databas:** JSON-fil för att hantera datalagring

## Förberedelser

Innan du kör appen, se till att du har Node.js installerat på din dator. Du behöver även API-nycklar för Google Custom Search och Auth0. Lägg till dessa i en `.env`-fil enligt konfigurationsinstruktionerna nedan.

## Konfiguration

1. Skapa en `.env`-fil i `server`-mappen och lägg till dina API-nycklar:
    ```
    VITE_GOOGLE_KEY=<din_google_api_nyckel>
    VITE_GOOGLE_SEARCH_ID=<din_sökmotors_id>
    VITE_AUTH0_DOMAIN=<din_auth0_domän>
    VITE_AUTH0_CLIENT_ID=<din_auth0_klient_id>
    ```

## Installation

För att sätta upp projektet, följ dessa steg:

1. Klona repot:
    ```
    git clone <repo_url>
    ```

2. Installera beroenden för både klient och server:

    - För server:
        ```
        cd server
        npm install
        ```
    
    - För client:
        ```
        cd client
        npm install
        ```

## Körning

För att starta servern och klienten, öppna två terminalfönster och kör följande kommandon:

- **Server:**
    ```
    cd server
    nodemon server
    ```

- **Client:**
    ```
    cd client
    npm run dev
    ```

Appen kommer nu att vara tillgänglig i din webbläsare.

## Funktioner

- **Bildsökning:** Användare kan söka efter bilder med hjälp av Google Custom Search API.
- **Favoritbilder:** Användare kan spara sina favoritbilder.
- **Autentisering:** Användare kan logga in med Auth0 för att spara sina favoriter.
