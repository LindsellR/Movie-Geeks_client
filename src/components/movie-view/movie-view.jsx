import {useParams} from "react-router";
import { Link } from "react-router-dom";
import {useState} from "react";
import "./movie-view.scss";
import { Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

//Props
export const MovieView = ({ movies, user, token, onFavouriteChange }) => {
  const { movieId } = useParams(); //Using react router to extract movie ID
  const movie = movies.find((m) => m._id === movieId); //find selected movie

  const similarMovies = movies //find similar movies
    .filter((m) => m.genre === movie.genre && m._id !==movie._id)
    .sort(() => Math.random() - 0.5) // Shuffle the array randomly
    .slice(0, 3); //limit to 3 similar movies

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

  const isFavourite = user?.FavouriteMovies?.includes(movie?._id) //Determines whether to show Add or Remove in the button.

  //Handles adding/removing movies from user favourites
  const handleFavouriteToggle = () => {
    setErrorMessage(""); // Clear any previous errors
    setSuccessMessage(""); // Clear success too

    if (!user?.Username) {
      console.error("Username is missing in the user object");
      setErrorMessage("User info is incomplete. Please log in again.");
      return;
    }

  //DELETE or POST method depending on whether adding or removing favourite movie
    const url = `https://movie-geeks-one.vercel.app/users/${user.Username}/movies/${movie._id}`;
    const method = isFavourite ? "DELETE" : "POST";
  
  // Prevent sending POST again if already favourite
    if (method === "POST" && isFavourite) {
      setErrorMessage("This movie is already in your favourites.");
      return;
    }
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error("Error response:", text);
            throw new Error("Favourite update failed");
          });
        }
        return response.json();
      })
      .then((response) => {
        setSuccessMessage(
          isFavourite
            ? "Movie removed from favourites."
            : "Movie added to favourites!"
        );
      
        setTimeout(() => {
          setSuccessMessage("");
          onFavouriteChange(response.updatedUser);
        }, 3000); // Wait 3 seconds before clearing + updating
      });      
    };
  

    if (!movie) {
      return (
        <div role="alert" aria-live="polite">
          Movie not found or still loading.
        </div>
      );
    }
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
      {user && (
      <Row className="mt-4 gx-2 gy-2">
          <Col md={6} xs={12}>
            <Button
              className="w-100 favourite-button"
              onClick={handleFavouriteToggle}
              aria-label={
                isFavourite
                  ? "Remove this movie from your favourites"
                  : "Add this movie to your favourites"
              }
            >
              {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            </Button>
          </Col>
          <Col md={6} xs={12}>
            <Link to="/" className="w-100 d-block">
              <button className="w-100 back-button">Back</button>
            </Link>
          </Col>
      </Row>
    
        )}
      
        {successMessage && (
          <div
            className="alert alert-success mt-3"
            role="status"
            aria-live="polite"
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            className="alert alert-danger mt-3"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </div>
        )}



      {similarMovies.length > 0 && (
      <>
        <h2 className="text-center mt-5" id="similar-movies-heading">
          Similar Movies
        </h2>
        <Row
          className="justify-content-md-center"
          role="region"
          aria-labelledby="similar-movies-heading"
          >
          {similarMovies.map((similar) => {
            console.log("user being passed into MovieCard:", user); 
            return (
              <Col className="mb-4" key={similar._id} lg={4} md={6} sm={12}>
                <MovieCard
                  movie={similar}
                  user={user}
                  token={token}
                  onFavouriteChange={onFavouriteChange}
                />
              </Col>
            );
          })}
        </Row>
      </>
    )}
  </div>
 );
};
 