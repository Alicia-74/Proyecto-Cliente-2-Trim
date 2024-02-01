import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import GlobalView from './Views/GlobalView';
import ContinentView from './Views/ContinentView';
import Menu from './Components/Menu';
import { GoogleLogin } from '@react-oauth/google';
import './App.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Limpiar el token de acceso al cargar la página
    setAccessToken(null);
    sessionStorage.removeItem('accessToken');
  }, []);

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
  };

  const handleFilterClick = (newFilter) => {
    console.log('Filter button clicked with filter:', newFilter);
    setFilter(newFilter);
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecode = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecode);

    setAccessToken(credentialResponse.credential);
    sessionStorage.setItem('accessToken', credentialResponse.credential);
    setIsUserLoggedIn(true);
  };

  const isTokenValid = () => {
    try {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken && decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

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

export default App;