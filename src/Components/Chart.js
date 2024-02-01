import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale } from 'chart.js/auto';

Chart.register(LinearScale);

const PopulationChart = ({ data }) => {
  if (!data) {
    return <div>Error: No hay datos para mostrar.</div>;
  }

  const lilacColor = 'rgba(152, 109, 216,';

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: `${lilacColor} 0.3)`, 
      borderColor: `${lilacColor} 1)`, 
      borderWidth: 1,
      barThickness: 15,
      minBarLength: 6,

    })),
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      },
    },
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    layout: {
      padding: {
        left: 80,
        right: 80,
        top: 40,
        bottom: 180,
      },
    },
  };

  const chartSize = {
    width: 1200,
    height: 600,
  };

  return <Bar data={chartData} options={{ ...options, ...chartSize }} />;
};

export default PopulationChart;
