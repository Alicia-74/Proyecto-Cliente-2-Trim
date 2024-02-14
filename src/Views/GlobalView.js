import React, { useEffect, useState } from 'react';  // Importa React, useEffect y useState desde la librería 'react'
import { getAllCountries } from '../Services/api';  // Importa la función getAllCountries desde '../Services/api'
import PopulationChart from '../Components/Chart G';  // Importa el componente PopulationChart desde '../Components/Chart G'

const GlobalView = () => {  // Define el componente funcional GlobalView
  const [regionsData, setRegionsData] = useState([]);  // Declara el estado 'regionsData' con un array vacío y una función para actualizarlo
  const [filterRange, setFilterRange] = useState({ min: '', max: '' });  // Declara el estado 'filterRange' con un objeto vacío y una función para actualizarlo
  const [filteredRegionsData, setFilteredRegionsData] = useState([]);  // Declara el estado 'filteredRegionsData' con un array vacío y una función para actualizarlo

  useEffect(() => {  // Efecto para cargar los datos de los países cuando el componente se monta por primera vez
    const fetchData = async () => {  // Función asincrónica fetchData para obtener los datos de los países
      try {
        const data = await getAllCountries();  // Llama a la función getAllCountries para obtener los datos de los países
        const regionsPopulation = data.reduce((result, country) => {  // Reduce los datos de los países para obtener la población por región
          const { region, population } = country;
          result[region] = (result[region] || 0) + population;
          return result;
        }, {});
        setRegionsData(regionsPopulation);  // Actualiza el estado 'regionsData' con la población por región
      } catch (error) {  // Maneja errores en la obtención de datos
        console.error('Error fetching countries:', error);  // Muestra el error en la consola
      }
    };

    fetchData();  // Llama a la función fetchData para cargar los datos cuando el componente se monta
  }, []);  // El efecto se ejecuta solo una vez al montar el componente, por lo que el array de dependencias está vacío

  useEffect(() => {  // Efecto para filtrar y actualizar los datos cuando cambia el rango de filtrado
    // Aplica el filtro a los datos
    const filteredData = Object.entries(regionsData)
      .filter(([region, population]) =>
        (!filterRange.min || population >= parseInt(filterRange.min.replace(/\./g, ''), 10)) &&
        (!filterRange.max || population <= parseInt(filterRange.max.replace(/\./g, ''), 10))
      )
      .reduce((result, [region, population]) => {
        result[region] = population;
        return result;
      }, {});

    setFilteredRegionsData(filteredData);  // Actualiza el estado 'filteredRegionsData' con los datos filtrados
  }, [filterRange, regionsData]);  // El efecto se ejecuta cada vez que cambia el rango de filtrado o los datos de las regiones

  // Formatea los datos para el gráfico
  const chartData = {
    labels: Object.keys(filteredRegionsData),
    datasets: [
      {
        label: 'Population',
        data: Object.values(filteredRegionsData),
      },
    ],
  };

  // Función para manejar los cambios en el rango de filtrado
  const handleFilterRangeChange = (event, field) => {
    const value = event.target.value;  // Obtiene el valor del campo de entrada
    // Elimina puntos y comas existentes y luego agrega puntos para cada tres dígitos
    const formattedValue = value.replace(/[.,]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setFilterRange((prevFilterRange) => ({  // Actualiza el estado 'filterRange' con el nuevo valor del campo
      ...prevFilterRange,
      [field]: formattedValue,
    }));
  };

  return (
    <div className='global'>  {/* Renderiza un div con la clase 'global' */}
      <h1>Global Population</h1>  {/* Renderiza el título 'Global Population' */}
      <div className='filtro'>  {/* Renderiza un div con la clase 'filtro' */}
        <h4>Filter</h4>  {/* Renderiza un subtítulo 'Filter' */}
        <div>  {/* Renderiza un div */}
          <label htmlFor="minPopulation">Min: </label>  {/* Renderiza una etiqueta para el campo de entrada mínimo */}
          <input
            type="text"  // Establece el tipo de entrada como texto
            id="minPopulation"  // Establece el id del campo de entrada mínimo
            value={filterRange.min}  // Establece el valor del campo de entrada mínimo
            onChange={(e) => handleFilterRangeChange(e, 'min')}  // Asigna la función handleFilterRangeChange al evento onChange del campo de entrada mínimo
          />
        </div>
        <div>  {/* Renderiza otro div */}
          <label htmlFor="maxPopulation">Max: </label>  {/* Renderiza una etiqueta para el campo de entrada máximo */}
          <input
            type="text"  // Establece el tipo de entrada como texto
            id="maxPopulation"  // Establece el id del campo de entrada máximo
            value={filterRange.max}  // Establece el valor del campo de entrada máximo
            onChange={(e) => handleFilterRangeChange(e, 'max')}  // Asigna la función handleFilterRangeChange al evento onChange del campo de entrada máximo
          />
        </div>
      </div>
      <PopulationChart data={chartData} isHorizontal={false} />  {/* Renderiza el componente PopulationChart con los datos del gráfico y una bandera 'isHorizontal' establecida en false */}
    </div>
  );
};

export default GlobalView;  // Exporta el componente GlobalView
