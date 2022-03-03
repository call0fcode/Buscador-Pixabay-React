import React, { useState } from 'react';
import Alert from './Alert';

const Formulario = ({ guardarTerminoBusqueda }) => {
  const [termino, guardarTermino] = useState('');
  const [error, guardarError] = useState(false);

  const confirmarTermino = e => {
    e.preventDefault();

    // Validación (comprobar que no está vacía la búsqueda)
    if (termino.trim() === '') {
      // Mostrar error durante 3 segundos.
      guardarError(true);
      setTimeout(() => {
        guardarError(false);
      }, 3000);
      return;
    }

    // No ha habido ningún error. Reset por si lo hubo anteriormente.
    guardarError(false);

    // Reset formulario.
    guardarTermino('');

    // Enviar al componente principal el término a buscar codificado para URL.
    guardarTerminoBusqueda(termino);
  };

  return (
    <form onSubmit={confirmarTermino}>
      <div className='row'>
        <div className='form-group col-md-8'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Busca una imagen, ejemplo: fútbol o café'
            onChange={e => guardarTermino(e.target.value)}
            value={termino}
          />
        </div>

        <div className='form-group col-md-4'>
          <input
            type='submit'
            className='btn btn-lg btn-danger btn-block'
            value='Buscar'
          />
        </div>

        {error && (
          <div className='form-group text-center col-12'>
            <Alert mensaje='Introduzca algún término a buscar.' />
          </div>
        )}
      </div>
    </form>
  );
};

export default Formulario;
