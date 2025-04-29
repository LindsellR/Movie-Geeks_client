import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

//Props 
export const MovieCard = ({ movie, user, token, onFavouriteChange, setMessage }) => {
  //check if movie already in favourites
  const isFavourite = user?.FavouriteMovies?.includes(movie._id);

  //Handles adding or removing favourites
  const handleFavouriteToggle = () => {
    if (!user || !user.Username) {
      console.error("User is not logged in or missing username");
      return; // Early exit if user is not valid
    }
  
    const url = `https://movie-geeks-one.vercel.app/users/${user.Username}/movies/${movie._id}`;
    const method = isFavourite ? "DELETE" : "POST";
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      const text = await response.text();
      if (!response.ok) {
        throw new Error("Favourite update failed");
      }
  
      const { updatedUser } = JSON.parse(text);
      onFavouriteChange?.(updatedUser);
    })
    .then(() => {
      setMessage(method === "POST" ? "Added to favourites!" : "Removed from favourites!");
      setTimeout(() => setMessage(""), 2500); // Hide message after 2.5 seconds
    })
    .catch((err) => {
      console.error("Error updating favourites:", err);
      setMessage("Error updating favourites");
    });
  };
  
//Renders the MovieCard
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-grid gap-2">
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="outline-primary">Open</Button>
        </Link>
        {user && (
          <Button
            variant={isFavourite ? "danger" : "outline-success"}
            onClick={handleFavouriteToggle}
          >
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </Button>
        )}
         </Card.Footer>

</Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  onFavouriteChange: PropTypes.func,
  setMessage: PropTypes.func,
};
