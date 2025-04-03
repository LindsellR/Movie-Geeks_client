import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    
    {
        id : 1,
        title: "Jules et Jim",
        description: "Jules et Jim is a story about a love triangle between two friends and a woman set over decades.",

        image: 'https://cdn.posteritati.com/posters/000/000/073/658/jules-and-jim-md-web.jpg' ,

        genre: "Romance",

        director: "François Truffaut",
        
    },
    {
        id: 2,
        title: "L'Aventura",
        description: "During a yachting trip, a young woman mysteriously disappears, leading to a slow unraveling of relationships among those left behind.",
        
        image: 'https://cdn.posteritati.com/posters/000/000/055/301/lavventura-md-web.jpg',

        genre: "Mystery",
            "Description": "Mystery films revolve around solving puzzles or unexplained events, often featuring detectives, suspense, and psychological intrigue.",
       
        director: "Michelangelo Antonioni",
        
    },
    {
        id: 3,
        title: "The Conformist",
        description: "A man becomes a fascist hitman to suppress his past and conform to Mussolini's Italy, but his mission becomes morally complex.",

        image: 'https://cdn.posteritati.com/posters/000/000/037/644/the-conformist-md-web.jpg',

        genre: "Political Thriller",
        
        director: "Bernardo Bertolucci",
        
    },
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
