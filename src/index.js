import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));

// Crea el punto de entrada de la aplicación y renderiza el componente principal
root.render(
  // Usa React.StrictMode para identificar y corregir problemas en el código:

  //1º Utiliza GoogleOAuthProvider para integrar la autenticación de Google
  //2º Renderiza el componente principal de la aplicación

  <React.StrictMode>
    <GoogleOAuthProvider clientId="968784867247-5uvsi1m7rvncg79a0tj38l8itrhvm2pi.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Registra las métricas web para análisis
reportWebVitals();
