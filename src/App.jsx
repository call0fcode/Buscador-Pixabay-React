import React, { useState, useEffect } from 'react';

// Helpers
import { consultarAPI, imagenesPorPagina } from './helpers/pixabay';

// Componentes
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import Paginador from './components/Paginador';
import Alert from './components/Alert';

function App() {
  const [terminoBusqueda, guardarTerminoBusqueda] = useState();
  const [resultadosBusqueda, guardarResultadosBusqueda] = useState({});
  const [buscando, guardarBuscando] = useState();
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  // Consultar la API cuando haya un término a buscar o se cambie de página.
  useEffect(() => {
    // Evitamos que se consulte la API en el primer renderizado de la app.
    if (!terminoBusqueda) return;

    consultarAPI(
      terminoBusqueda,
      paginaActual,
      guardarResultadosBusqueda,
      guardarBuscando
    );
  }, [terminoBusqueda]);

  // Cálculo del número total de páginas cuando ya haya algún resultado.
  useEffect(() => {
    if (resultadosBusqueda.hits) {
      const calcularTotalPaginas = Math.ceil(
        resultadosBusqueda.totalHits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);
    }
  }, [resultadosBusqueda]);

  return (
    <div className='container'>
      <div className='jumbotron'>
        <div className='lead text-center mb-3'>Buscador de Imágenes</div>
        <Formulario guardarTerminoBusqueda={guardarTerminoBusqueda} />
      </div>
      {
        // Si no se está buscando, hay término de búsqueda y no ha habido resultados.
        buscando === false &&
          terminoBusqueda &&
          Object.entries(resultadosBusqueda).length === 0 && (
            <Alert
              mensaje={`No hay resultados para: "${terminoBusqueda}"`}
              tipo='info'
            />
          )
      }

      {Array.isArray(resultadosBusqueda.hits) &&
        resultadosBusqueda.hits.length > 0 && (
          <div className='row justify-content-center pb-5'>
            <Paginador
              terminoBusqueda={terminoBusqueda}
              totalPaginas={totalPaginas}
              paginaActual={paginaActual}
              guardarPaginaActual={guardarPaginaActual}
              guardarResultadosBusqueda={guardarResultadosBusqueda}
              animacion={false}
              guardarBuscando={guardarBuscando}
            />

            <ListadoImagenes imagenes={resultadosBusqueda.hits} />

            <Paginador
              terminoBusqueda={terminoBusqueda}
              totalPaginas={totalPaginas}
              paginaActual={paginaActual}
              guardarPaginaActual={guardarPaginaActual}
              guardarResultadosBusqueda={guardarResultadosBusqueda}
              guardarBuscando={guardarBuscando}
            />
          </div>
        )}
    </div>
  );
}

export default App;
