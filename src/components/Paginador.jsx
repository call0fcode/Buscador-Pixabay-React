import React, { useEffect } from 'react';

// Helpers
import { consultarAPI } from '../helpers/pixabay.js';

const Paginador = ({
  totalPaginas,
  paginaActual,
  guardarPaginaActual,
  terminoBusqueda,
  guardarResultadosBusqueda,
  animacion = true,
  guardarBuscando,
}) => {
  // No renderizar el componente si el número de páginas no es mayor a 1.
  if (totalPaginas <= 1) return null;

  // Funciones del paginador
  const moverHaciaArriba = () => {
    // Mover pantalla hacia arriba.
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' });
  };

  const paginaAnterior = e => {
    e.preventDefault();
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = e => {
    e.preventDefault();
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  // Al cambiar de página consultar siguiente página a la API y desplazar
  // pantalla si corresponde.
  useEffect(() => {
    consultarAPI(
      terminoBusqueda,
      paginaActual,
      guardarResultadosBusqueda,
      guardarBuscando
    );
    if (animacion) {
      moverHaciaArriba();
    }
  }, [paginaActual]);

  // TO-DO: Añadir números clicables al paginador
  // useEffect(() => {
  //   const numerosDePaginas = [];

  //   for (let index = 0; index < totalPaginas; index++) {
  //     numerosDePaginas[index] = index + 1;
  //   }

  //   console.log(numerosDePaginas);
  // }, [totalPaginas]);

  return (
    <nav aria-label='...'>
      <ul className='pagination'>
        <li className={`page-item ${paginaActual === 1 && 'disabled'}`}>
          <a
            className='page-link'
            href='#'
            tabIndex='-1'
            aria-disabled='true'
            onClick={paginaAnterior}
          >
            Anterior
          </a>
        </li>

        <li className='page-item active' aria-current='page'>
          <a className='page-link' href='#' onClick={e => e.preventDefault()}>
            {paginaActual} de {totalPaginas}
          </a>
        </li>

        <li
          className={`page-item ${paginaActual === totalPaginas && 'disabled'}`}
        >
          <a className='page-link' href='#' onClick={paginaSiguiente}>
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginador;
