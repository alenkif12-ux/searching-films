const BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = '80f91a8b';

const searchInput = document.getElementById("search-input");
const statusMessage = document.getElementById("status-message");
const moviesContainer = document.getElementById("movies-container");

const fetchMovies = async (query) => {
    try {
        statusMessage.textContent = "Loading...";
        moviesContainer.innerHTML = "";
        const response = await fetch (`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();
        if (data.Response === "False") {
            return statusMessage.textContent = "Movies not found."
        };
        statusMessage.textContent = ""
        moviesContainer.innerHTML = data.Search.map(movie => {
            const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
            return `<div class="movie-card">
            <img src="${poster}" alt="${movie.Title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p></div>`
            }).join('');
    } catch (error) {
        statusMessage.textContent = "Failed to load movies. Please check your connection.";
        console.error(error);
    }
};

searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query === "") {
        moviesContainer.innerHTML = "";
        statusMessage.textContent = "";
        return;
    }
    fetchMovies(query);
});