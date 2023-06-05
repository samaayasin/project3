const fs = require('fs');
const fetch = require('isomorphic-fetch');

const catalogFile = 'movies.json';
let movieCatalog = [];

function loadCatalog() {
  try {
    const D = fs.readFileSync(catalogFile, 'utf8');
    movieCatalog = JSON.parse(D);
  } catch (error) {
    console.error('Error loading movie catalog:', error);
  }
}

function saveCatalog() {
  try {
    fs.writeFileSync(catalogFile, JSON.stringify(movieCatalog, null, 2));
    console.log('Movie catalog saved successfully.');
  } catch (error) {
    console.error('Error saving movie catalog:', error);
  }
}

function displayCatalog() {
  loadCatalog();
  console.log('\nMovie Catalog\n');
  movieCatalog.forEach((movie) => {
    console.log('Title:', movie.title);
    console.log('Director:', movie.director);
    console.log('Genre:', movie.genre);
    console.log('Year:', movie.year);
    console.log('-------------------');
  });
  saveCatalog();
}

function addMovie(title, director, year, genre) {
  loadCatalog();
  const newMovie = {
    title,
    director,
    year,
    genre
  };
  movieCatalog.push(newMovie);
  saveCatalog();
  console.log('New movie added successfully.');
}

function updateMovie(title, newTitle, newDirector, newYear, newGenre) {
  loadCatalog();
  const movieIndex = movieCatalog.findIndex((movie) => movie.title === title);
  if (movieIndex !== -1) {
    movieCatalog[movieIndex].title = newTitle;
    movieCatalog[movieIndex].director = newDirector;
    movieCatalog[movieIndex].year = newYear;
    movieCatalog[movieIndex].genre = newGenre;
    saveCatalog();
    console.log('Movie details updated successfully.');
  } else {
    console.log('Movie not found in the catalog.');
  }
}

function deleteMovie(title) {
  loadCatalog();
  const movieIndex = movieCatalog.findIndex((movie) => movie.title === title);
  if (movieIndex !== -1) {
    movieCatalog.splice(movieIndex, 1);
    saveCatalog();
    console.log('Movie deleted successfully.');
  } else {
    console.log('Movie not found in the catalog.');
  }
}

function searchMovies(keyword) {
  loadCatalog();
  const matchingMovies = movieCatalog.filter(
    (movie) =>
      movie.title.includes(keyword) ||
      movie.director.includes(keyword) ||
      movie.genre.includes(keyword)
  );
  if (matchingMovies.length > 0) {
    console.log(`Search results for "${keyword}":\n`);
    matchingMovies.forEach((movie) => {
      console.log('Title:', movie.title);
      console.log('Director:', movie.director);
      console.log('Genre:', movie.genre);
      console.log('Year:', movie.year);
      console.log('-------------------');
    });
  } else {
    console.log(`No movies found matching "${keyword}".`);
  }
}

function filterMovies(criteria) {
  loadCatalog();
  const filteredMovies = movieCatalog.filter((movie) => movie.genre.toLowerCase() === criteria.toLowerCase() || movie.year === criteria);
  if (filteredMovies.length > 0) {
    console.log(`Filtered movies by "${criteria}":\n`);
    filteredMovies.forEach((movie) => {
      console.log('Title:', movie.title);
      console.log('Director:', movie.director);
      console.log('Genre:', movie.genre);
      console.log('Year:', movie.year);
      console.log('-------------------');
    });
  } else {
    console.log(`No movies found for "${criteria}".`);
  }
}

  async function fetchMoviesFromAPI() {
    try {
      const response = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching movies from API: ' + error.message);
    }
  }
  
module.exports = {
  displayCatalog,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  filterMovies,
  fetchMoviesFromAPI
};
