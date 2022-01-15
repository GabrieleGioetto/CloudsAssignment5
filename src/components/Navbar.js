import "../App.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Link, NavLink } from "react-router-dom";

export const MyNavbar = ({ user }) => {
  return (
    <Navbar
      className="myNavbar"
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#deets">
              {user.displayName ? user.displayName : "User"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button as={NavLink} to="/wishlist" exact variant="outline-danger">
          <FontAwesomeIcon icon={faHeart} />
        </Button>
        <Button variant="danger">Logout</Button>
      </Container>
    </Navbar>
  );
};
