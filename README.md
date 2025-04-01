# Movie-Geeks Client 

Movie-Geeks is a React-based web application built with Parcel. This README will guide you through setting up and running the app.

## 📌 Project Overview
This project uses:
- **React 19.1.0** 
- **Parcel 2.14.4** 
- **SCSS** via `@parcel/transformer-sass`.

---

## Getting Started

### Prerequisites
- **Node.js** (v18.x.x or higher) and **npm** (v9.x.x or higher) installed.
- **Parcel** installed globally (recommended but not required).


## Install
```bash
npm install -g parcel

## Project Structure
Movie-Geeks_client/
|--src
    |--index.html   *main HTML file*
    |--index.jsx    *react entry point*
    |--index.scss   *scss styles*
|--package.json     *project configuration*
|--node_modules     *Project dependencies
|--README.md        *Documentation*

## Configuration
{
  "name": "movie-geeks-client",
  "version": "1.0.0",
  "description": "Movie-Geeks app front end",
  "scripts": {
    "start": "parcel src/index.html --port 3000",
    "build": "parcel build src/index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "parcel": "^2.14.4",
    "@parcel/transformer-sass": "^2.14.4"
  }
}


