import React from 'react';  // Importa React desde la librería 'react'
import { Bar } from 'react-chartjs-2';  // Importa el componente Bar de react-chartjs-2 para generar gráficos de barras
import { Chart, LinearScale } from 'chart.js/auto';  // Importa Chart y LinearScale desde chart.js/auto para registrar la escala lineal

Chart.register(LinearScale);  // Registra la escala lineal en Chart.js

const PopulationChart = ({ data }) => {  // Define el componente PopulationChart que recibe datos como prop
  if (!data) {  // Verifica si no hay datos
    return <div>Error: No hay datos para mostrar.</div>;  // Devuelve un mensaje de error si no hay datos
  }

  const chartData = {  // Define los datos del gráfico
    labels: data.labels,  // Etiquetas del eje x
    datasets: data.datasets.map((dataset) => ({  // Mapea los conjuntos de datos para configurar los datos del gráfico
      label: dataset.label,  // Etiqueta del conjunto de datos
      data: dataset.data,  // Datos del conjunto de datos
      backgroundColor: [  // Color de fondo de las barras
        'rgba(0, 99, 132, 0.6)',
        'rgba(30, 99, 132, 0.6)',
        'rgba(60, 99, 132, 0.6)',
        'rgba(120, 99, 132, 0.6)',
        'rgba(180, 99, 132, 0.6)',
        'rgba(210, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [  // Color del borde de las barras
        'rgba(0, 99, 132, 1)',
        'rgba(30, 99, 132, 1)',
        'rgba(60, 99, 132, 1)',
        'rgba(120, 99, 132, 1)',
        'rgba(180, 99, 132, 1)',
        'rgba(210, 99, 132, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,  // Ancho del borde de las barras
      barThickness: 30,  // Grosor de las barras
      minBarLength: 6,  // Longitud mínima de las barras
    })),
  };

  const options = {  // Opciones de configuración del gráfico
    scales: {  // Escalas del gráfico
      y: {  // Escala del eje y
        type: 'category',  // Tipo de escala: categoría
        grid: {  // Configuración de la cuadrícula en el eje y
          display: false,  // No muestra la cuadrícula en el eje y
        },
      },
      x: {  // Escala del eje x
        grid: {  // Configuración de la cuadrícula en el eje x
          display: false,  // No muestra la cuadrícula en el eje x
        },
      },
    },
    indexAxis: 'y',  // Establece el eje y como índice
    elements: {  // Elementos del gráfico
      bar: {  // Configuración de las barras
        borderWidth: 2,  // Ancho del borde de las barras
      },
    },
    plugins: {  // Plugins del gráfico
      legend: {  // Configuración de la leyenda
        display: true,  // Muestra la leyenda
      },
    },
    layout: {  // Diseño del gráfico
      padding: {  // Relleno del gráfico
        left: 100,  // Relleno izquierdo
        right: 130,  // Relleno derecho
        top: 30,  // Relleno superior
        bottom: 100,  // Relleno inferior
      },
    },
  };

  return <Bar data={chartData} options={options} />;  // Renderiza el gráfico de barras con los datos y opciones proporcionados
};

export default PopulationChart;  // Exporta el componente PopulationChart
