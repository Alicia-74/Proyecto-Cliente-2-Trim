import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PopulationChart from '../Components/Chart';
import { getAllCountries } from '../Services/api';
import '../App.css';

const ContinentView = () => {
  const { continent } = useParams();
  const [countries, setCountries] = useState([]);
  const [filterRange, setFilterRange] = useState({ min: '', max: '' });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Population',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the list of countries based on the specified population range
    const filteredCountries = countries.filter(
      (country) =>
        country.region === continent &&
        (filterRange.min === '' || country.population >= parseInt(filterRange.min.replace(/\./g, ''), 10)) &&
        (filterRange.max === '' || country.population <= parseInt(filterRange.max.replace(/\./g, ''), 10))
    );

    // Update the chart data
    setChartData({
      labels: filteredCountries.map((country) => country.name.common),
      datasets: [
        {
          label: 'Population',
          data: filteredCountries.map((country) => country.population),
        },
      ],
    });
  }, [continent, filterRange, countries]);

  // Function to handle changes in the filter range
  const handleFilterRangeChange = (event, field) => {
    const value = event.target.value;
    // Remove existing dots and commas and then add dots for every three digits
    const formattedValue = value.replace(/[.,]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setFilterRange((prevFilterRange) => ({
      ...prevFilterRange,
      [field]: formattedValue,
    }));
  };

  return (
    <div className='country'>
      <h1>{continent} Population</h1>
      <div className='filtro'>
        <h4>Filter</h4>
        <div>
          <label htmlFor="minPopulation">Min: </label>
          <input
            type="text"  // Cambiado a texto para permitir puntos
            id="minPopulation"
            value={filterRange.min}
            onChange={(e) => handleFilterRangeChange(e, 'min')}
          />
        </div>
        <div>
          <label htmlFor="maxPopulation">Max: </label>
          <input
            type="text"  // Cambiado a texto para permitir puntos
            id="maxPopulation"
            value={filterRange.max}
            onChange={(e) => handleFilterRangeChange(e, 'max')}
          />
        </div>
      </div>
      <PopulationChart data={chartData} isHorizontal={true} />
    </div>
  );
};

export default ContinentView;
