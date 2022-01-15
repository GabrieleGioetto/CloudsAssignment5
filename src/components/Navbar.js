import "../App.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";

import { Link, NavLink } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export const MyNavbar = ({ user }) => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("sloggato");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Navbar
      className="myNavbar"
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" exact>
          <img className="imageLogoNavbar" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>{user.displayName ? user.displayName : "User"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button
          className="btnNavbar"
          as={NavLink}
          to="/wishlist"
          exact
          variant="outline-danger"
        >
          <FontAwesomeIcon icon={faHeart} />
        </Button>
        <Button className="btnNavbar" variant="danger" onClick={() => logout()}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};
