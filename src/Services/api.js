import axios from 'axios';

const apiUrl = 'https://restcountries.com/v3.1/all';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getCountriesByContinent = async (continent) => {
  try {
    const response = await axios.get(`${apiUrl}?region=${continent}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries in ${continent}:`, error);
    return [];
  }
};
