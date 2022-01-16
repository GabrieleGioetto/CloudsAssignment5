import { signInWithGoogle } from "../services/firebase";
import { Button, Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";

import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  return (
    <div className="center">
      <div className="login">
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <h2>Movies Room</h2>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <img className="imageLogo" src={logo} alt="Logo" />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Button
                className="btnLogin"
                onClick={signInWithGoogle}
                exact
                variant="outline-success"
              >
                <FontAwesomeIcon className="googleLogo" icon={faGoogle} />
                Login
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
