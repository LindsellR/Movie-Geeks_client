import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        <div>{movie.title}</div>
      </div>
    );
  };
  //Define all props constraints for the MovieCard
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string,
      image: PropTypes.string,
      director: PropTypes.string,
      actors: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  }