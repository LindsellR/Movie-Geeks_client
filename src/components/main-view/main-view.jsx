//importing state management/side effects, routing and navigation, component files, bootstrap and index.scss for styling

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import "../../index.scss";


export const MainView = () => {
  //local storage to continue login across refreshes
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null); // storing the current session
  const [movies, setMovies] = useState([]); //storing list of all fetched movies
  const [error, setError] = useState(""); //error handling
  const [loading, setLoading]  = useState(true);  //loading spinner
  const [globalMessage, setGlobalMessage] = useState("");

  const handleLogout = () => { 
    setUser(null); 
    localStorage.clear(); //logout function clears local storage
  };
  
  //runs when user or token changes
  useEffect(() => {
    if (!token || !user) return;

    setLoading(true); //start spinner

    //fetch movies and load in correct format
    fetch("https://movie-geeks-one.vercel.app/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((moviesData) => {
        const moviesFromApi = moviesData.map((movie) => ({
          _id: movie._id,
          title: movie.Title,
          genre: movie.Genre?.Name,
          genreDescription: movie.Genre?.Description,
          image: movie.ImageURL,
          director: movie.Director?.Name,
          bio: movie.Director?.Bio,
          actors: movie.Actors || [],
          description: movie.Description
        }));
        setMovies(moviesFromApi);
        setError("");
      })
      .catch((err) => {
        console.error("Error loading movies:", err.message);
        setError("Oops! Unable to load movies at the moment.");
      })
      .finally(() => setLoading(false));
  }, [token, user]);

  //show "loading" spinner
  if (loading && user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  //Navigation bar default
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => setUser(null)} />
        <Container className="py-5">
          {error && (
            <div className="alert alert-danger" role="alert" aria-live="polite">
              {error}
            </div>
          )}
          <Routes>
          <Route //Default route (if not logged in go to login form, if logged in go to main)
            path="*" element={
                !user ? (
                  <Navigate to="/login" replace />
            ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          <Route //login and signup routes
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Row className="justify-content-md-center" role="region" aria-label="Login form">
                  <Col sm={6}>
                    <h2 className="text-center">Login</h2>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);         
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                </Row>
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Row className="justify-content-md-center" role="region" aria-label="Signup form">
                  <Col sm={6}>
                    <h2 className="text-center">Sign Up</h2>
                    <SignupView />
                  </Col>
                </Row>
              )
            }
          />
          <Route //User profile route
            path="/profile"
            element={
              user ? (
              <ProfileView
                user={user}
                token={token}
                movies={movies} 
                onLoggedOut={handleLogout}
                onUserUpdate={(updatedUser) => {
                  setUser(updatedUser);
                  localStorage.setItem("user", JSON.stringify(updatedUser));
                }}
              />
             ) : (
              <Navigate to="/login" replace />
             )
            }
          />
          <Route //MovieView route
              path="/movies/:movieId"
              element={
                <MovieView
                  movies={movies}
                  user={user}
                  token={token}
                  onFavouriteChange={(updatedUser) => {
                    setUser(updatedUser);
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                  }}
                />
              }
            />
          <Route
                  path="/"
                  element={
                    !user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <main role="main" aria-label="Movie List View">
                    {globalMessage && (
                    <div
                      className="text-center mb-4"
                      role="status"
                      aria-live="polite"
                      style={{ fontSize: "1rem", color: "green" }}
                    >
                      {globalMessage}
                    </div>
                  )}

                  {movies.length === 0 ? (
                    <div role="alert" aria-live="polite">Loading movies...</div>
                  ) : (
                    <Row>
                      {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={3}>
                          <MovieCard 
                            movie={movie}
                            user={user}
                            token={token}
                            onFavouriteChange={(updatedUser) => {
                              setUser(updatedUser);
                              localStorage.setItem("user", JSON.stringify(updatedUser));
                            }} 
                            setMessage={setGlobalMessage}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </main>
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
