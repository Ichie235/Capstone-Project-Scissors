import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navbars({ loginData, handleLogout, handleApiKey }) {
  const [mmenu, togglemMenu] = useState(false);
  return (
    <Navbar expand="lg" className="bg-body-primary">
      <Container>
        <Navbar.Brand href="#home">Url Shortener</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>

            <Navbar.Text style={{ margin: "0px 17px 0px 17px" }}>
              Signed in as:{" "}
              <span style={{ color: "green" }}>{loginData.name}</span>
            </Navbar.Text>
            <Navbar.Text style={{ marginRight: "17px" }}>
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="#0"
                onClick={() => {
                  handleApiKey();
                  togglemMenu();
                }}
              >
                Create API Key{" "}
              </a>
            </Navbar.Text>
            <Navbar.Text>
              <a href="#0" role="menuitem" onClick={handleLogout}>
                Logout
              </a>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
