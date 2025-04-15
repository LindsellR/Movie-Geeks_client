import { useState } from "react";
import {Form, Button, Card, CardGroup, Container, Col, Row} from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    //prevents the default behaviour of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movie-geeks-one.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        } else {
            alert("No such user");
        }
    })
    .catch((e) => {
        alert("Something went wrong")
    });
  };
  return (
    <Container>
      <Row>
        {/* <Col></Col> */}
        <Col>
          <CardGroup>
            <Card>
              <Card.Header>Login to Movie Geeks</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} aria-labelledby="login-heading">
                  <Form.Group>
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      aria-required="true"
                      placeholder="Please Enter your Username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-required="true"
                      placeholder="Please Enter your Password"
                    />
                  </Form.Group>
                  <br></br>
                  <Button type="submit" aria-label="Submit login form">
                    Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        {/* <Col></Col> */}
      </Row>
    </Container>
  );
};
