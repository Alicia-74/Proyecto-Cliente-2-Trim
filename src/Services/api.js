import axios from 'axios';  // Importa axios para realizar solicitudes HTTP

const apiUrl = 'https://restcountries.com/v3.1/all';  // URL de la API de países

// Función asincrónica para obtener todos los países
export const getAllCountries = async () => {
  try {
    const response = await axios.get(apiUrl);  // Realiza una solicitud GET a la URL de la API
    return response.data;  // Devuelve los datos obtenidos de la respuesta
  } catch (error) {  // Captura cualquier error que ocurra durante la solicitud
    console.error('Error fetching data:', error);  // Registra el error en la consola
    return [];  // Devuelve un array vacío en caso de error
  }
};

// Función asincrónica para obtener países por continente
export const getCountriesByContinent = async (continent) => {
  try {
    const response = await axios.get(`${apiUrl}?region=${continent}`);  // Realiza una solicitud GET con el parámetro de región
    return response.data;  // Devuelve los datos obtenidos de la respuesta
  } catch (error) {  // Captura cualquier error que ocurra durante la solicitud
    console.error(`Error fetching countries in ${continent}:`, error);  // Registra el error en la consola
    return [];  // Devuelve un array vacío en caso de error
  }
};
