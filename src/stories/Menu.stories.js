import React, { useState } from 'react';  // Importa React y useState desde la librería 'react'
import Menu from '../Components/Menu';   // Importa el componente Menu desde su ubicación relativa
import { BrowserRouter as Router } from 'react-router-dom';  // Importa BrowserRouter con alias Router desde la librería 'react-router-dom'

export default {
  title: 'Components/Menu',  // Define el título de la historia de Storybook
  component: Menu,  // Especifica el componente que se está probando
  parameters: {
    layout: 'fullscreen',  // Parámetro para definir el diseño de pantalla completa en Storybook
  },
  tags: ['autodocs'],  // Etiqueta para indicar que esta historia genera documentación automáticamente
  argTypes: {
    onSelectContinent: { action: 'selected' },  // Define un argumento de tipo acción para onSelectContinent
  },
};

// Template es una función que devuelve el componente Menu con la funcionalidad añadida
const Template = (args) => {
  const [selectedContinent, setSelectedContinent] = useState('');  // Estado para rastrear el continente seleccionado

  // Función para manejar la selección de continente
  const handleSelectContinent = (continent) => {
    setSelectedContinent(continent);  // Actualiza el estado con el continente seleccionado
    args.onSelectContinent(continent);  // Llama a la acción onSelectContinent con el continente seleccionado
  };

  // Retorna el componente Menu envuelto en un Router y un div para centrar el texto
  return (
    <Router>
      <Menu {...args} onSelectContinent={handleSelectContinent} />  
      <div style={{ textAlign: 'center' }}> 
        {selectedContinent ? (  // Renderiza el nombre del continente si está seleccionado
          <h1>{`${selectedContinent} Population`}</h1>
        ) : (  // De lo contrario, muestra "Global Population"
          <h1>Global Population</h1>
        )}
      </div>
    </Router>
  );
};

// Exporta la historia llamada InteractiveMenu con los argumentos predeterminados
export const InteractiveMenu = Template.bind({});
InteractiveMenu.args = {};
