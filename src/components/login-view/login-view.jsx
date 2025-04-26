import { useState } from "react";
import {Form, Button, Card, CardGroup, Container, Col, Row} from "react-bootstrap";


export const LoginView = ({ onLoggedIn }) => {
  //local state for username and password fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //prevents the default behaviour of the form which is to reload the entire page
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    //POST's request to backend as JSON. Successful login sends user and token to be stored in localStorage
    fetch("https://movie-geeks-one.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    .then(async (response) => response.json())
    .then((data) => {

        //Handling login success or failure, with failure message
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        } else {
          setErrorMessage(resData.message || "Invalid username or password.");
        }
    })
    .catch((e) => {
      setErrorMessage("Something went wrong. Please try again later.");
    });
  };
  // Bootstrap form layout with onChange handlers to update
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Header>Login to Movie Geeks</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} aria-labelledby="login-heading">
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert" aria-live="polite">
                      {errorMessage}
                    </div>
                  )}

                  <Form.Group>
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      aria-required="true"
                      placeholder="Please enter your username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-required="true"
                      placeholder="Please enter your password"
                    />
                  </Form.Group>

                  <br />
                  <Button type="submit" aria-label="Submit login form">
                    Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
