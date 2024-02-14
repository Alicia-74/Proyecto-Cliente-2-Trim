import React, { useState } from 'react';  // Importa React y useState desde la librería 'react'
import { Link } from 'react-router-dom';  // Importa Link desde 'react-router-dom' para la navegación entre páginas
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';  // Importa Navbar, Nav y NavDropdown desde 'react-bootstrap' para la creación de la barra de navegación
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos CSS de Bootstrap
import '../App.css';  // Importa los estilos CSS locales

const continents = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania', 'Antarctic'];  // Lista de continentes disponibles

const Menu = ({ onSelectContinent }) => {  // Define el componente funcional Menu
  const [showDropdown, setShowDropdown] = useState(false);  // Declara el estado showDropdown para controlar la visibilidad del menú desplegable

  const handleDropdownToggle = () => {  // Función para alternar la visibilidad del menú desplegable
    setShowDropdown(!showDropdown);  // Cambia el estado showDropdown al valor opuesto al actual
  };



  //1º Crea la barra de navegación con Bootstrap
  //2º Renderiza un enlace a la página de continentes y llama a onSelectContinent con un argumento vacío al hacer clic 
  //3º Icono de casa
  //4º Icono de lista
  //5º Menú desplegable de continentes
  //6º Mapea la lista de continentes y crea un enlace para cada uno

  return (
    <Navbar bg="light" expand="lg" style={{ maxHeight: '80px', minHeight: '60px', marginBottom: '40px', borderBottom: '1px solid grey'}}>
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

export default Menu;  // Exporta el componente Menu
