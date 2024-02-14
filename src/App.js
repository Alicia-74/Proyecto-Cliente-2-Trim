import React, { useState, useEffect } from 'react';  // Importa React, useState y useEffect desde la librería 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importa Router, Routes y Route desde la librería 'react-router-dom'
import { jwtDecode } from 'jwt-decode';  // Importa la función jwtDecode desde 'jwt-decode'
import GlobalView from './Views/GlobalView';  // Importa el componente GlobalView desde './Views/GlobalView'
import ContinentView from './Views/ContinentView';  // Importa el componente ContinentView desde './Views/ContinentView'
import Menu from './Components/Menu';  // Importa el componente Menu desde './Components/Menu'
import { GoogleLogin } from '@react-oauth/google';  // Importa GoogleLogin desde '@react-oauth/google'
import './App.css';  // Importa el archivo de estilos './App.css'

const App = () => {  // Define el componente funcional App
  const [filter, setFilter] = useState('');  // Declara el estado 'filter' con una cadena vacía y una función para actualizarlo
  const [selectedContinent, setSelectedContinent] = useState(null);  // Declara el estado 'selectedContinent' con un valor inicial nulo y una función para actualizarlo
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));  // Declara el estado 'accessToken' con el valor inicial obtenido de sessionStorage y una función para actualizarlo
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  // Declara el estado 'isUserLoggedIn' con el valor inicial false y una función para actualizarlo

  useEffect(() => {  // Efecto para limpiar el token de acceso al cargar la página
    setAccessToken(null);  // Establece el token de acceso como null
    sessionStorage.removeItem('accessToken');  // Elimina el token de acceso de sessionStorage
  }, []);  // El efecto se ejecuta solo una vez al montar el componente, por lo que el array de dependencias está vacío

  const handleContinentChange = (continent) => {  // Función para manejar cambios en el continente seleccionado
    setSelectedContinent(continent);  // Actualiza el estado 'selectedContinent' con el nuevo continente seleccionado
  };

  const handleFilterClick = (newFilter) => {  // Función para manejar clics en el filtro
    console.log('Filter button clicked with filter:', newFilter);  // Registra en la consola el filtro seleccionado
    setFilter(newFilter);  // Actualiza el estado 'filter' con el nuevo filtro seleccionado
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {  // Función para manejar el éxito del inicio de sesión de Google
    const credentialResponseDecode = jwtDecode(credentialResponse.credential);  // Decodifica la respuesta de credenciales
    console.log(credentialResponseDecode);  // Registra en la consola la respuesta de credenciales decodificada

    setAccessToken(credentialResponse.credential);  // Actualiza el estado 'accessToken' con la credencial
    sessionStorage.setItem('accessToken', credentialResponse.credential);  // Almacena la credencial en sessionStorage
    setIsUserLoggedIn(true);  // Establece el estado 'isUserLoggedIn' como verdadero
  };

  const isTokenValid = () => {  // Función para verificar si el token de acceso es válido
    try {
      const decodedToken = jwtDecode(accessToken);  // Decodifica el token de acceso
      return decodedToken && decodedToken.exp * 1000 > Date.now();  // Devuelve true si el token no está caducado
    } catch (error) {
      return false;  // Devuelve false si hay un error al decodificar el token
    }
  };

  // Establece la estructura de enrutamiento de la aplicación:
  
  //1º Renderiza el componente GoogleLogin si el token no es válido
  //2º Renderiza el menú y las rutas si el token es válido 
  //3º Renderiza el componente Menu con la función onSelectContinent para manejar cambios en el continente seleccionado
  //4º Renderiza la ruta para ver los datos de un continente
  //5º Renderiza ContinentView con las propiedades filter y selectedContinent
  //6º  Renderiza GlobalView con las propiedades filter y onFilterClick
  //7º Renderiza GlobalView como ruta predeterminada con las propiedades filter y onFilterClick

  return (
    <Router>  
      {!isTokenValid() && (  
        <div>  
          <div className='google'>  
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} />  
          </div>
        </div>
      )}

      {isTokenValid() && (  
        <div>  
          <Menu onSelectContinent={handleContinentChange} />  
          <Routes> 
            <Route  
              path="/continents/:continent"
              element={<ContinentView filter={filter} selectedContinent={selectedContinent} />}  
            />
            <Route  
              path="/continents"
              element={<GlobalView filter={filter} onFilterClick={handleFilterClick} />}  
            />
            <Route path="/" element={<GlobalView filter={filter} onFilterClick={handleFilterClick} />} />  
          </Routes>
        </div>
      )}
    </Router>  
  );
};

export default App;  // Exporta el componente App
