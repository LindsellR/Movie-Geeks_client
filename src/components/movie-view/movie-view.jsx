import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view-container">
      <div className="movie-image-container">
        <img
          src={movie.image}
          alt={movie.title}
          className="movie-image"
        />
      </div>
      <br />
      <div>
        <h3>Title:</h3>
        <span>{movie.title}</span>
      </div>
      <br />
      <div>
        <h3>Movie Description:</h3>
        <span>{movie.description}</span>
      </div>
      <br />
      <div>
        <h3>Genre:</h3>
        <span>{movie.genre}</span>
        <p>{movie.genreDescription}</p>
      </div>
      <br />
      <div>
        <h3>Director:</h3>
        <span>{movie.director}</span>
        <p>{movie.bio}</p>
      </div>
      <br />
      <div>
        <h3>Actors:</h3>
        <ul>
          {movie.actors && movie.actors.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>
      </div>
      <br />
      <Button
        className="back-button"
        onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
};
