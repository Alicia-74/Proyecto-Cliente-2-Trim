import React, { useEffect, useState } from 'react';  // Importa React, useEffect y useState desde la librería 'react'
import { useParams } from 'react-router-dom';  // Importa useParams de 'react-router-dom' para obtener los parámetros de la URL
import PopulationChart from '../Components/Chart';  // Importa el componente PopulationChart desde '../Components/Chart'
import { getAllCountries } from '../Services/api';  // Importa la función getAllCountries desde '../Services/api'
import '../App.css';  // Importa estilos CSS

const ContinentView = () => {  // Define el componente funcional ContinentView
  const { continent } = useParams();  // Extrae el parámetro 'continent' de la URL utilizando useParams
  const [countries, setCountries] = useState([]);  // Declara el estado 'countries' con un array vacío y una función para actualizarlo
  const [filterRange, setFilterRange] = useState({ min: '', max: '' });  // Declara el estado 'filterRange' con un objeto vacío y una función para actualizarlo
  const [chartData, setChartData] = useState({  // Declara el estado 'chartData' con un objeto que contiene las etiquetas y los conjuntos de datos para el gráfico, y una función para actualizarlo
    labels: [],
    datasets: [
      {
        label: 'Population',
        data: [],
      },
    ],
  });

  useEffect(() => {  // Efecto para cargar la lista de países cuando el componente se monta por primera vez
    const fetchData = async () => {  // Función asincrónica fetchData para obtener los datos de los países
      try {
        const data = await getAllCountries();  // Llama a la función getAllCountries para obtener los datos de los países
        setCountries(data);  // Actualiza el estado 'countries' con los datos obtenidos
      } catch (error) {  // Maneja errores en la obtención de datos
        console.error('Error fetching countries:', error);  // Muestra el error en la consola
      }
    };

    fetchData();  // Llama a la función fetchData para cargar los datos cuando el componente se monta
  }, []);  // El efecto se ejecuta solo una vez al montar el componente, por lo que el array de dependencias está vacío

  useEffect(() => {  // Efecto para filtrar y actualizar los datos del gráfico cuando cambian el continente seleccionado o el rango de filtrado de población
    const filteredCountries = countries.filter(  // Filtra la lista de países basándose en el continente seleccionado y el rango de población especificado
      (country) =>
        country.region === continent &&
        (filterRange.min === '' || country.population >= parseInt(filterRange.min.replace(/\./g, ''), 10)) &&
        (filterRange.max === '' || country.population <= parseInt(filterRange.max.replace(/\./g, ''), 10))
    );

    setChartData({  // Actualiza el estado 'chartData' con los datos filtrados para el gráfico
      labels: filteredCountries.map((country) => country.name.common),
      datasets: [
        {
          label: 'Population',
          data: filteredCountries.map((country) => country.population),
        },
      ],
    });
  }, [continent, filterRange, countries]);  // El efecto se ejecuta cada vez que cambia el continente, el rango de filtrado o los datos de los países

  // Función para manejar los cambios en el rango de filtrado
  const handleFilterRangeChange = (event, field) => {
    const value = event.target.value;  // Obtiene el valor del campo de entrada
    const formattedValue = value.replace(/[.,]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');  // Formatea el valor para permitir puntos como separador de miles
    setFilterRange((prevFilterRange) => ({  // Actualiza el estado 'filterRange' con el nuevo valor del campo
      ...prevFilterRange,
      [field]: formattedValue,
    }));
  };

  return (
    <div className='country'>  {/* Renderiza un div con la clase 'country' */}
      <h1>{continent} Population</h1>  {/* Renderiza el título con el nombre del continente y "Population" */}
      <div className='filtro'>  {/* Renderiza un div con la clase 'filtro' */}
        <h4>Filter</h4>  {/* Renderiza un subtítulo 'Filter' */}
        <div>  {/* Renderiza un div */}
          <label htmlFor="minPopulation">Min: </label>  {/* Renderiza una etiqueta para el campo de entrada mínimo */}
          <input
            type="text"  // Cambia el tipo de entrada a texto para permitir puntos como separador de miles
            id="minPopulation"  // Establece el id del campo de entrada mínimo
            value={filterRange.min}  // Establece el valor del campo de entrada mínimo
            onChange={(e) => handleFilterRangeChange(e, 'min')}  // Asigna la función handleFilterRangeChange al evento onChange del campo de entrada mínimo
          />
        </div>
        <div>  {/* Renderiza otro div */}
          <label htmlFor="maxPopulation">Max: </label>  {/* Renderiza una etiqueta para el campo de entrada máximo */}
          <input
            type="text"  // Cambia el tipo de entrada a texto para permitir puntos como separador de miles
            id="maxPopulation"  // Establece el id del campo de entrada máximo
            value={filterRange.max}  // Establece el valor del campo de entrada máximo
            onChange={(e) => handleFilterRangeChange(e, 'max')}  // Asigna la función handleFilterRangeChange al evento onChange del campo de entrada máximo
          />
        </div>
      </div>
      <PopulationChart data={chartData} isHorizontal={true} />  {/* Renderiza el componente PopulationChart con los datos del gráfico y una bandera 'isHorizontal' establecida en true */}
    </div>
  );
};

export default ContinentView;  // Exporta el componente ContinentView
