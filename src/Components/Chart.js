import React from 'react';  // Importa React desde la librería 'react'
import { Bar } from 'react-chartjs-2';  // Importa el componente Bar de react-chartjs-2 para generar gráficos de barras
import { Chart, LinearScale } from 'chart.js/auto';  // Importa Chart y LinearScale desde chart.js/auto para registrar la escala lineal

Chart.register(LinearScale);  // Registra la escala lineal en Chart.js

const PopulationChart = ({ data }) => {  // Define el componente PopulationChart que recibe datos como prop
  if (!data) {  // Verifica si no hay datos
    return <div>Error: No hay datos para mostrar.</div>;  // Devuelve un mensaje de error si no hay datos
  }

  const lilacColor = 'rgba(152, 109, 216,';  // Define el color lilac para el gráfico

  const chartData = {  // Define los datos del gráfico
    labels: data.labels,  // Etiquetas del eje x
    datasets: data.datasets.map((dataset) => ({  // Mapea los conjuntos de datos para configurar los datos del gráfico
      label: dataset.label,  // Etiqueta del conjunto de datos
      data: dataset.data,  // Datos del conjunto de datos
      backgroundColor: `${lilacColor} 0.3)`,  // Color de fondo de las barras
      borderColor: `${lilacColor} 1)`,  // Color del borde de las barras
      borderWidth: 1,  // Ancho del borde de las barras
      barThickness: 15,  // Grosor de las barras
      minBarLength: 6,  // Longitud mínima de las barras
    })),
  };

  const options = {  // Opciones de configuración del gráfico
    scales: {  // Escalas del gráfico
      x: {  // Escala del eje x
        type: 'category',  // Tipo de escala: categoría
        grid: {  // Configuración de la cuadrícula
          display: false,  // No muestra la cuadrícula en el eje x
        },
        ticks: {  // Configuración de las marcas en el eje x
          autoSkip: false,  // No omitir automáticamente las etiquetas
          maxRotation: 45,  // Máxima rotación de las etiquetas
          minRotation: 0,  // Mínima rotación de las etiquetas
        },
      },
      y: {  // Escala del eje y
        grid: {  // Configuración de la cuadrícula
          display: false,  // No muestra la cuadrícula en el eje y
        },
        ticks: {  // Configuración de las marcas en el eje y
          beginAtZero: true,  // Comienza el eje y desde cero
          min: 0,  // Valor mínimo en el eje y
        },
      },
    },
    indexAxis: 'x',  // Establece el eje x como índice
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
        left: 80,  // Relleno izquierdo
        right: 80,  // Relleno derecho
        top: 40,  // Relleno superior
        bottom: 180,  // Relleno inferior
      },
    },
  };

  const chartSize = {  // Tamaño del gráfico
    width: 1200,  // Ancho del gráfico
    height: 600,  // Altura del gráfico
  };

  return <Bar data={chartData} options={{ ...options, ...chartSize }} />;  // Renderiza el gráfico de barras con los datos y opciones proporcionados
};

export default PopulationChart;  // Exporta el componente PopulationChart
