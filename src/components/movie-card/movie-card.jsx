export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          console.log("Clicked on movie: ", movie.title);
          onMovieClick(movie);
        }}
      >
        <div>{movie.title}</div>
      </div>
    );
  };
  