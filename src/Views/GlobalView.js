import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../Services/api';
import PopulationChart from '../Components/Chart G';

const GlobalView = () => {
  const [regionsData, setRegionsData] = useState([]);
  const [filterRange, setFilterRange] = useState({ min: '', max: '' });
  const [filteredRegionsData, setFilteredRegionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCountries();
        const regionsPopulation = data.reduce((result, country) => {
          const { region, population } = country;
          result[region] = (result[region] || 0) + population;
          return result;
        }, {});
        setRegionsData(regionsPopulation);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply the filter to the data
    const filteredData = Object.entries(regionsData)
      .filter(([region, population]) =>
        (!filterRange.min || population >= parseInt(filterRange.min.replace(/\./g, ''), 10)) &&
        (!filterRange.max || population <= parseInt(filterRange.max.replace(/\./g, ''), 10))
      )
      .reduce((result, [region, population]) => {
        result[region] = population;
        return result;
      }, {});

    setFilteredRegionsData(filteredData);
  }, [filterRange, regionsData]);

  // Format the data for the chart
  const chartData = {
    labels: Object.keys(filteredRegionsData),
    datasets: [
      {
        label: 'Population',
        data: Object.values(filteredRegionsData),
      },
    ],
  };

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
    <div className='global'>
      <h1>Global Population</h1>
      <div className='filtro'>
        <h4>Filter</h4>
        <div>
          <label htmlFor="minPopulation">Min: </label>
          <input
            type="text"
            id="minPopulation"
            value={filterRange.min}
            onChange={(e) => handleFilterRangeChange(e, 'min')}
          />
        </div>
        <div>
          <label htmlFor="maxPopulation">Max: </label>
          <input
            type="text"
            id="maxPopulation"
            value={filterRange.max}
            onChange={(e) => handleFilterRangeChange(e, 'max')}
          />
        </div>
      </div>
      <PopulationChart data={chartData} isHorizontal={false} />
    </div>
  );
};

export default GlobalView;
