import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const continents = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania', 'Antarctic'];

const Menu = ({ onSelectContinent }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ maxHeight: '80px', minHeight: '60px', marginBottom: '40px', backgroundColor: '#888888' }}>

      <Navbar.Brand as={Link} to="/continents" onClick={() => onSelectContinent('')}>
        <i className="bi bi-house"></i> Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={handleDropdownToggle}>
            <i className="bi bi-list"></i>
            <NavDropdown show={showDropdown} title="Continents" id="basic-nav-dropdown">
              {continents.map((continent) => (
                <NavDropdown.Item
                  key={continent}
                  as={Link}
                  to={`/continents/${continent}`}
                  onClick={() => onSelectContinent(continent)}
                >
                  {continent}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
