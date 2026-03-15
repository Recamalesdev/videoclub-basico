// 1. Al arrancar: Leemos el disco duro buscando el archivo "misPeliculas"
let listaPeliculas = JSON.parse(localStorage.getItem("misPeliculas")) || [];

export const agregarPelicula = (nuevaPelicula) => {
  // 2. Metemos la nueva peli en la memoria RAM
  listaPeliculas = [...listaPeliculas, nuevaPelicula];

  // 3. Guardamos en el disco duro: (Nombre del archivo, Convertimos LA VARIABLE a texto)
  localStorage.setItem("misPeliculas", JSON.stringify(listaPeliculas));

  console.log("Memoria actualizada:", listaPeliculas);
};

/**
 * 4. Función 'getter' para leer el estado de forma segura desde otros archivos.
 */
export const obtenerPelicula = () => {
  return listaPeliculas;
};

export const eliminarPelicula = (idAEliminar) => {
  listaPeliculas = listaPeliculas.filter(
    (pelicula) => pelicula.id !== idAEliminar,
  );

  localStorage.setItem("misPeliculas", JSON.stringify(listaPeliculas));

  console.log("Película eliminada. Nueva memoria:", listaPeliculas);
};

export const alternarVista = (idPelicula) => {
  listaPeliculas = listaPeliculas.map((pelicula) => {
    if (pelicula.id === idPelicula) {
      return { ...pelicula, vista: !pelicula.vista };
    }

    return pelicula;
  });

  localStorage.setItem("misPeliculas", JSON.stringify(listaPeliculas));
};
