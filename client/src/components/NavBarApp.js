import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/navBar.css";

const NavBarApp = () => {
  const token = localStorage.getItem("token", "");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <Navbar className="barrContainer" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#/user">User App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {token ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/user">Home</Nav.Link>
              <Nav.Link href="#/" onClick={logOut}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/signup">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBarApp;
