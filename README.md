# Projekt i implementacja sklepu internetowego z akcesoriami dla graczy „GameZone”

Projekt inżynierski zrealizowany na kierunku Informatyka (Specjalność: Cyberbezpieczeństwo i Technologie Sieciowe) w Lubelskiej Akademii WSEI.

Aplikacja jest nowoczesnym sklepem internetowym typu SPA (Single Page Application) zrealizowanym w architekturze MVP (Minimum Viable Product).

## Informacje o autorze

- **Student:** Jakub Słowik (Nr albumu: 42490)
- **Opiekun projektu:** dr inż. Piotr Kopniak
- **Uczelnia:** Lubelska Akademia WSEI
- **Rok:** 2026

## Zastosowane technologie

Projekt wykorzystuje najnowszy stos technologiczny (stan na rok 2026):

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Język programowania:** TypeScript
- **Baza danych i Backend:** Google Firebase 11 (Cloud Firestore, Authentication)
- **Zarządzanie stanem:** React Context API + TanStack Query 5
- **Style:** SCSS (Sass Modules)
- **Powiadomienia:** React Hot Toast
- **Komponenty UI:** Swiper (karuzele), React Icons

## Funkcjonalności systemu

### Moduł Klienta

- Przeglądanie katalogu produktów z podziałem na kategorie (Myszki, Klawiatury, Akcesoria itp.).
- Zaawansowane filtrowanie (według ceny, oceny, statusu promocji) oraz sortowanie produktów.
- Pełna obsługa koszyka zakupowego (dodawanie, usuwanie, dynamiczna zmiana ilości) z zapisem stanu w pamięci przeglądarki (`localStorage`).
- Składanie zamówień (zapis danych do bazy Firestore z relacją do użytkownika).
- Rejestracja i logowanie użytkowników (obsługa sesji przez Firebase Auth).

### Moduł Administratora

- Dostęp do panelu chroniony autoryzacją (tylko dla kont z uprawnieniami administratora).
- Pełny CRUD asortymentu (Dodawanie, Edycja, Usuwanie produktów ze sklepu).
- Podgląd listy złożonych zamówień.

### Wymagania niefunkcjonalne

- **RWD (Responsive Web Design):** Aplikacja w pełni dostosowana do urządzeń mobilnych, tabletów i komputerów stacjonarnych.
- **Dark Mode:** Interfejs zaprojektowany domyślnie w ciemnej kolorystyce, zgodnej z trendami branży gamingowej.

## Instrukcja instalacji i uruchomienia

Aby uruchomić projekt w środowisku lokalnym, należy wykonać następujące kroki:

### 1. Wymagania wstępne

Upewnij się, że na komputerze zainstalowane jest środowisko [Node.js](https://nodejs.org/) (zalecana wersja LTS, np. v20 lub nowsza).

### 2. Instalacja zależności

Otwórz terminal w głównym folderze projektu (tam, gdzie znajduje się plik `package.json`) i wykonaj polecenie:

```bash
npm install
```

### 3. Konfiguracja zmiennych środowiskowych

Projekt wymaga połączenia z usługą Firebase. Utwórz plik o nazwie .env.local w głównym katalogu projektu i uzupełnij go kluczami API (klucze te nie są dołączone do repozytorium ze względów bezpieczeństwa).

Wzór pliku .env.local:

```
# Zmienne klienckie (Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=twoj_klucz_api
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=twoja_domena.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=twoje_id_projektu
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=twoj_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=twoje_id_wysylania
NEXT_PUBLIC_FIREBASE_APP_ID=twoje_app_id

# Zmienne serwera (Firebase Admin)
FIREBASE_PROJECT_ID=twoje_id_projektu
FIREBASE_CLIENT_EMAIL=twoj_email_serwisowy@twoj_projekt.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=twoj_klucz_prywatny_serwisu
```

### 4. Uruchomienie serwera deweloperskiego
Aby uruchomić aplikację w trybie deweloperskim (z obsługą przeładowania na żywo):
```
npm run dev
```
Po uruchomieniu aplikacja będzie dostępna w przeglądarce pod adresem: http://localhost:3000

### 5. Budowanie wersji produkcyjnej
Aby zbudować wersję zoptymalizowaną do wdrożenia na serwer produkcyjny:
```
npm run build
```

### 6. Uruchomienie serwera produkcyjnego
Po wcześniejszym wykonaniu `npm run build`:
```
npm run start
```

### 7. Linting (sprawdzenie jakości kodu)
Aby sprawdzić kod za pomocą ESLint:
```
npm run lint
```

### Struktura katalogów (Wybrane)
/src/app - Główna logika routingu aplikacji (Next.js App Router).

/src/components - Komponenty interfejsu użytkownika wielokrotnego użytku (np. karty produktów, nawigacja).

/src/context - Globalne zarządzanie stanem (np. stan koszyka, sesja użytkownika).

/src/lib - Pliki konfiguracyjne połączenia z usługami Google Firebase (`firebase.ts`, `firebase-admin.ts`).

/src/hooks - Autorskie hooki React (np. do obsługi kolekcji Firestore).

/src/app/assets/styles - Pliki stylów globalnych i zmiennych SCSS.

/public - Zasoby statyczne (obrazy, ikony).