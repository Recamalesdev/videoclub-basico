import { eliminarPelicula, obtenerPelicula, alternarVista } from "./estado.js";

// Referencia al contenedor principal de la lista
const contenedorPeliculas = document.querySelector("#lista-peliculas");
const contadorPeliculas = document.querySelector("#contador-peliculas");

export const renderizarPeliculas = (lista) => {
  contenedorPeliculas.innerHTML = "";

  lista.forEach((pelicula) => {
    const li = document.createElement("li");

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "❌ Borrar";

    btnBorrar.addEventListener("click", () => {
      eliminarPelicula(pelicula.id);

      // Al borrar, cogemos la nueva lista y actualizamos ambas cosas
      const nuevaLista = obtenerPelicula();
      renderizarPeliculas(nuevaLista);
      actualizarContador(nuevaLista);
    });

    const btnVista = document.createElement("button");
    btnVista.textContent = pelicula.vista ? "✅ Vista" : "❌ No vista";

    btnVista.addEventListener("click", () => {
      alternarVista(pelicula.id);

      const nuevaLista = obtenerPelicula();
      renderizarPeliculas(nuevaLista);
      actualizarContador(nuevaLista);
    });

    li.textContent = `🎬 ${pelicula.titulo} ${pelicula.anio} - Dirigida por: ${pelicula.director} (${pelicula.genero})`;

    li.appendChild(btnBorrar);

    li.appendChild(btnVista);

    contenedorPeliculas.appendChild(li);
  });
};

export const actualizarContador = (lista) => {
  contadorPeliculas.textContent = `Total: ${lista.length}`;
};
