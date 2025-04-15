import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap"

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-grid gap-2">
            <Button
            variant="primary"
            size="lg"
            onClick={() => onMovieClick(movie)}
            >
            Open
            </Button>
          </Card.Footer>

      </Card>
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