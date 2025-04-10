import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

  // useEffect(() => {
  //   if (!token) 
  //     return;
    

  //   fetch("https://movie-geeks-one.vercel.app/movies",
  //   {
  //     headers: {Authorization: `Bearer ${token}`}
  //   })
  //     .then((response) => response.json())
  //     .then((moviesData) => {

  //       const moviesFromApi = moviesData.map((movie) => {
  //         return {
  //           id: movie._id,
  //           title: movie.Title,
  //           genre: movie.Genre.Name,
  //           image: movie.ImageURL,
  //           director: movie.Director?.Name,
  //           actors: movie.Actors,
  //           description: movie.Description
  //         };
  //       });
  //       console.log("moviesFromApi:", moviesFromApi);
  //       setMovies(moviesFromApi);

  //     });
  // }, [token]);

  useEffect(() => {
    if (!token) return;
  
    fetch("https://movie-geeks-one.vercel.app/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
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
  
       console.log("Formatted movies:", moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error.message);
      });
  }, [token]);
  
  
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }
  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return movie.genre === selectedMovie.genre
      && movie.title !== selectedMovie.title;
    })

    return (
      <>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} />
        <br />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelection) => {
              setSelectedMovie(newSelection);
          }} />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  
  return (
    <div>
      {movies.map((movie) => (
       
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
            console.log("Movie IDs:", movies.map(m => m._id))
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};
