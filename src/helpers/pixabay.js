const apiKey = '11311885-97586cccfbf54bc700283e7b4';
export const imagenesPorPagina = 30;

export const consultarAPI = async (
  terminoBusqueda,
  paginaActual,
  guardarState,
  guardarBuscando
) => {
  guardarBuscando(true);
  // Montar y ejecutar consulta a la API.
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    terminoBusqueda
  )}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
  const respuesta = await fetch(url);
  const resultados = await respuesta.json();

  // Comprobar si hay resultados de búsqueda.
  if (resultados.hits.length > 0) {
    guardarBuscando(false);
    guardarState(resultados);
  } else {
    // Mostrar aviso de que no hay resultados (componente Alert).
    // Además se para la ejecución de la función para no ejecutar el
    // resto del código ya que, si no hay resultados, es irrelevante.
    guardarBuscando(false);
    guardarState({});
    return;
  }
};
