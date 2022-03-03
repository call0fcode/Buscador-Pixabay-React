import React from 'react';

const Alert = ({ mensaje, tipo = 'error' }) => {
  let claseTipo = tipo;

  switch (tipo) {
    case 'info':
      claseTipo = 'danger';
      break;

    default:
      claseTipo = 'primary';
      break;
  }

  return (
    <div className={`alert alert-${claseTipo}`} role='alert'>
      {mensaje}
    </div>
  );
};

export default Alert;
