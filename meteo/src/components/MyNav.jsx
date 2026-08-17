import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNav = function () {
  return (
    <Navbar expand="sm" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-light">
          EpiMeteo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
