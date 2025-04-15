import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import {Row, Col, Button, Container} from "react-bootstrap";
import "../../index.scss"

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState(undefined);

  // useEffect(() => {
  //   if (!token) 
  //     return;
    

  //   fetch("https://movie-geeks-one.vercel.app/movies",
  //   {
  //     headers: {Authorization: `Bearer ${token}`}
  //   })
  //     .then((response) => response.json())
  //     .then((moviesFromApi) => {

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
          setError("No movies today, please try again"); 
          return; 
        }
        return response.json();
      })
      .then((moviesData) => {
        if (!moviesData) return; 
        setError(undefined); 
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
      })
      .catch((err) => {
        console.error("Fetch failed:", err.message);
        setError("Oops! Something went wrong.");
       
      });
  }, [token]);
  
  
  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col sm={6} role="region" aria-label="Login or Signup form">
        <br />
        <h2 id="auth-heading" className="text-center">Login or Sign Up</h2>
        <br />
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            setToken(token);
            localStorage.setItem("token", token)
          }}/>
          <br />
         <h3 className="text-center">Or</h3>
         <br />
        <SignupView />
        </Col>
      </Row>
    );
  }
  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return movie.genre === selectedMovie.genre
      && movie.title !== selectedMovie.title;
    })

    return (
      <Row className="justify-content-md-center"   role="region" aria-label={`Details about the movie${selectedMovie.title}`}>
        <Col md={5}>
          <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} />
          <br />
      
          <h2 className="text-center" id="similar-movies-heading">Similar Movies</h2>
          <Row className="justify-content-md-center" role="region"
            aria-labelledby="similar-movies-heading">
              {similarMovies.map((movie) => (
                <Col className="mb-5"  key={movie._id} lg={7} md={9} sm={12}>
                    <MovieCard
                      movie={movie}
                      onMovieClick={(newSelection) => {
                        setSelectedMovie(newSelection);
                   }} 
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return <div>Loading, please wait ...</div>;
  }
  
  return (
   <Container className="py-5">
    <main role="main" aria-label="Movie List View">
       <Row>
          {movies.map((movie) => (
            <Col  className="mb-5" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                    //console.log("Movie IDs:", movies.map(m => m._id))
                  }}
                />
            </Col>
          ))}
        </Row>  
        <div className="d-flex justify-content-center mt-5 mb-4 ">
        <Button className="logout-button w-100"
          variant="primary" size="lg"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
          aria-label="Logout and clear user session"
        >
          Logout
        </Button>
      </div>
    </main>
    </Container>
    
  );
};
