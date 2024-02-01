import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale } from 'chart.js/auto';

Chart.register(LinearScale);

const PopulationChart = ({ data }) => {
  if (!data) {
    return <div>Error: No hay datos para mostrar.</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: [
        'rgba(0, 99, 132, 0.6)',
        'rgba(30, 99, 132, 0.6)',
        'rgba(60, 99, 132, 0.6)',
        'rgba(120, 99, 132, 0.6)',
        'rgba(180, 99, 132, 0.6)',
        'rgba(210, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(0, 99, 132, 1)',
        'rgba(30, 99, 132, 1)',
        'rgba(60, 99, 132, 1)',
        'rgba(120, 99, 132, 1)',
        'rgba(180, 99, 132, 1)',
        'rgba(210, 99, 132, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
      barThickness: 30,
      minBarLength: 6,
    })),
  };

  const options = {
    scales: {
      y: {
        type: 'category',
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    indexAxis: 'y',
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
        left: 100,
        right: 130,
        top: 30,
        bottom: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default PopulationChart;
