//Codigo para usar  API de peliculas
let apiKey = "d0d235088b9c5f969cd42295edfbb108";
//direccion principal de la API
let  baseUrl = "https://api.themoviedb.org/3";
//direeccion base para las imagenes de peliculas
let imageUrl = "https://image.tmdb.org/t/p/w300/";
//Numero de pagina principal
let page= 1;
//Ubicar si las peliculas se estan cargando
let loading = false;
//Seleccionar el container html
let container = document.querySelector("#movieContainer");
//seleciionar el elemento de loader
let loader = document.querySelector("#loader");

//funcion para obtener las peliculas
async function fetchMovies(page){
    loading = true;
    loader.style.display = "block";
    try {
    let response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=es-ES&page=${page}`);
    let data = await response.json();
     //La siguiente funcion dibuja las peliculas
     //data contiene toda la respuesta
     //results contiene el arreglo de las peliculas
        renderMovies(data.results);
    } catch (error) {
    console.error("Error al obtener las peliculas: " + error);
    } finally {
    loading = false;
    loader.style.display = "none";
    }
};
//Funcion para renderizar las peliculas
function renderMovies(movies){
    movies.forEach(movie => {
    let card = document.createElement("div");
    card.classList = ("movieCard");
   card.innerHTML = `<img src="${imageUrl + movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>`
    container.appendChild(card);
    })
}
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        page++;
        fetchMovies(page);
    }
});
fetchMovies(page);