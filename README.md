# Movie-Geeks Client 

Movie-Geeks is a React web application for classic film enthusiasts. The front end is built with Parcel and styled with SCSS and Bootstrap. It connects to the Movie-Geeks API to fetch movie data and manage user profiles.

### Project Overview
Technologies used:
- **React 19.1.0** 
- **Parcel 2.14.4** 
- **SCSS** via `@parcel/transformer-sass`.
- **Bootstrap** v5.3.5 and Bootstrap Icons
- **React Router DOM** v6.21.1
- **JWT Authentication** (handled by the backend)

---

### Features
- User signup, login, and logout.
- Browse a list of movies.
- View detailed movie information.
- Add or remove movies from your favorites (Favorites update globally and show success messages like "Added to favorites!")
- Update user profile and account information.
- Responsive design with Bootstrap styling.
- Live search functionality across movies (Movie searches update results instantly with debounced input).
- Clean error handling and loading states.
- Navigate between Home and Profile with React Router without full page reloads.

---
## Getting Started

### 1. Prerequisites
- **Node.js** (v18.x.x or higher) and **npm** (v9.x.x or higher) installed.
- **npm** (v9.x.x or higher)
- (Optional) Parcel installed globally (recommended but not required).

---

### 2. Install Dependencies
Clone the repository and install:

git clone https://github.com/LindsellR/Movie-Geeks_client.git
cd Movie-Geeks_client
npm install

---

### 3. Running Locally
Start the development server:

npm start
(This will run Parcel and open your app at http://localhost:3000/.)

---

### 4. Building for Production
To create a production build

npm run build
(Parcel will output the optimized build in a /dist folder.)

---

### 5. Project Structure
<pre lang="markdown"><code>```plaintext Movie-Geeks_client/ ├── src/ │ ├── components/ │ │ ├── movie-card/ │ │ ├── movie-view/ │ │ ├── login-view/ │ │ ├── signup-view/ │ │ ├── navigation-bar/ │ │ └── profile-view/ │ ├── index.html │ ├── index.jsx │ └── index.scss ├── package.json ├── README.md └── node_modules/ ```</code></pre>

---

## Scripts
| Command | Description |
|---------|-------------|
|npm start | Run the app locally(development)|
|npm run build| Create a production build |

---

## API Backend

This client communicates with the Movie-Geeks API, a Node.js/Express backend that provides movie data and handles authentication.

Make sure the backend is deployed and available when testing this client!

---

## License

This project is licensed under the ISC License.

---



