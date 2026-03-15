import { obtenerPelicula, agregarPelicula } from "./estado.js";
import { renderizarPeliculas, actualizarContador } from "./interfaz.js";

// Nodos del DOM (Inputs y Acciones)
const formPeliculas = document.querySelector("#form-peliculas");
const inputTitulo = document.querySelector("#input-titulo");
const selectGenero = document.querySelector("#select-genero");
const mensajeCarga = document.querySelector("#mensaje-carga");

// 1. Añado la palabra 'async' para poder usar 'await' dentro
formPeliculas.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tituloValue = inputTitulo.value.trim();

  if (tituloValue === "") {
    alert("Error: Escribe un título para buscar.");
    return;
  }

  mensajeCarga.style.display = "block";

  try {
    // 2.(Usamos la API pública de OMDB como ejemplo)
    // Clave API de prueba pública ("ban2221")
    const respuesta = await fetch(
      `https://www.omdbapi.com/?t=${tituloValue}&apikey=6ab10770`,
    );

    // 3. Traducir la respuesta a un objeto de JavaScript
    const datosInternet = await respuesta.json();

    mensajeCarga.style.display = "none";

    // Si la API  dice que no ha encontrado la película, (return)
    if (datosInternet.Response === "False") {
      alert("No se ha encontrado la película en Internet.");
      return;
    }

    // 4. Construcción del objeto con los datos de Internet
    const nuevaPelicula = {
      id: self.crypto.randomUUID(),
      titulo: datosInternet.Title, // La API nos devuelve el título en inglés (Title)
      director: datosInternet.Director,
      anio: datosInternet.Year,
      genero: selectGenero.value,
      vista: false,
    };

    // 5. LLamamos a la función
    agregarPelicula(nuevaPelicula);

    // 6. Refrescar la UI
    const listaActualizada = obtenerPelicula();
    renderizarPeliculas(listaActualizada);
    actualizarContador(listaActualizada);

    inputTitulo.value = "";
  } catch (error) {
    console.error("Hubo un error de conexión:", error);
  }
});

const listaIniciada = obtenerPelicula();

renderizarPeliculas(listaIniciada)
