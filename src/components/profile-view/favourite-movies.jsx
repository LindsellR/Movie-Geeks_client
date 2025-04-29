import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

//Props for userInfo object, list of movies to match favourites, function to remove favourites
export default function FavouriteMovies({ userInfo, movies, handleRemoveFavourite }) {
  if (!userInfo || !userInfo.FavouriteMovies) {
  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h3>Favourite Movies</h3>
          <p>Loading favourites ...</p> {/* early message while data preparing*/}
        </Col>
      </Row>
      </Container>);
  }
  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h3>Favourite Movies</h3>
        </Col>
      </Row>
      <Row>
        {userInfo.FavouriteMovies?.length === 0 ? (
          <Col>
            <p>No favourites yet.</p> {/*empty state message*/}
          </Col>
        ) : (
          userInfo.FavouriteMovies.map((id) => { {/*searches for favourites by movie ID*/}
            const movie = movies.find((m) => m._id === id);
            return movie ? (
              <Col xs={12} sm={6} md={4} lg={3} key={id} className="mb-4">
                <Card className="h-100 shadow-sm d-flex flex-column justify-content-between">
                  <Card.Img
                    variant="top"
                    src={movie.image}
                    alt={movie.title}
                    className="img-fluid"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center">{movie.title}</Card.Title>

                    {/* View Details Button */}
                    <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="d-grid mt-2">
                      <Button variant="primary">View Details</Button>
                    </Link>

                    {/* Remove Link */}
                    <Card.Footer className="text-center mt-2">
                      <Button
                        variant="link"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent unwanted nav
                          handleRemoveFavourite(id);
                        }}
                        className="p-0"
                        style={{ fontSize: '0.9rem'}}
                      >
                        Remove from Favourites
                      </Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ) : null;
          })
        )}
      </Row>
    </Container>
  );
}
