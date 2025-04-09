import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-geeks-one.vercel.app/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            genre: movie.Genre.Name,
            image: movie.ImageURL,
            director: movie.Director?.Name,
            actors: movie.Actors,
            description: movie.Description
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

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
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
