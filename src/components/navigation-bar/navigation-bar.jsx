//import for toggling navbar state and respond to route changes, bootstrap for styling, Link for client side navigation, useLocation to detect URL changes

import {useState, useEffect} from "react";
import { Navbar, Container, Nav, Form, FormControl, Button, } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => { //tells if someone logged in and handles logout and search logic
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar 
    bg="dark" 
    data-bs-theme="dark" 
    expand="md" 
    expanded={expanded}  onToggle={() => setExpanded(!expanded)} //hamburger menu to open/close with state
  >
    {/*Navbar commands and styling*/}
    <Container>
      <Navbar.Brand as={Link} to="/" onClick={() => { onSearch?.("");
                onResetSearch?.();
                setSearchTerm("");  
                }}> 
        <h1>Movie Geeks</h1>
        <h4>Classic European Films</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> 
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className="ms-5" 
                onClick={() => { onSearch?.("");
                onResetSearch?.();
                setSearchTerm("");  
                }}>Home</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="ms-4">My Profile</Nav.Link>
              </>
            )}
          </Nav>

            {user && (
              <Nav className="ms-auto">
                <Nav.Link
                  onClick={onLoggedOut}
                  aria-label="Logout and clear user session"
                >
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};