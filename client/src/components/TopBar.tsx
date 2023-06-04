import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import houseTableLogo from '/housetable.svg'
const TopBar: React.FC = () => {
  return (
    <>
   
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img className='pb-2'
            src={houseTableLogo}
            alt="Housetable logo"
          />
        </Navbar.Brand>

        <Nav>
            <Nav.Link href="#home">Houses</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

      </Container>
    </Navbar>

  
  </>
  );
}

export default TopBar;
