import { useState } from "react";
import {Form, Button, Card, CardGroup, Container, Col, Row} from "react-bootstrap"

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://movie-geeks-one.vercel.app/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container>
      <Row>
      {/* <Col></Col> */}
        <Col>
          <CardGroup>
            <Card>
              <Card.Header id="signup-heading">Sign Up for Movie Geeks</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} aria-labelledby="signup-heading">
                  <h2 ></h2>
                  <Form.Group>
                    <Form.Label htmlFor="signup-username">Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="5"
                      aria-required="true"
                      placeholder="Username minimum 5 characters (Must be Alphanumeric)"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="signup-password">Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      aria-required="true"
                      placeholder="Password Must Be At Least 8 Characters in Length"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="signup-email">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-required="true"
                      placeholder="Please Enter a Valid Email Address"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="signup-birthdate">Birthdate:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      aria-required="true"
                    />
                  </Form.Group>
                  <br></br>
                  <Button type="submit" aria-label="Submit signup form">
                    Sign Up
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
