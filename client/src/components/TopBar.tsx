import React from "react";
import houseTableLogo from "/housetable.svg";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ToggleModalBtn } from "./ToggleModalBtn";

const TopBar: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img className="pb-2" src={houseTableLogo} alt="Housetable logo" />
          </Navbar.Brand>
          <Nav>
            <ToggleModalBtn />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
