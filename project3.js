const { displayCatalog, addMovie, updateMovie, deleteMovie, searchMovies, filterMovies, fetchMoviesFromAPI } = require('./movieCatalog');
const readline = require('readline');
const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('\nMovie Catalog CLI');
  console.log('-----------------\n');
  console.log('1. Display Movie Catalog');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Details');
  console.log('4. Delete Movie');
  console.log('5. Search Movies');
  console.log('6. Filter Movies');
  console.log('7. Fetch Movies from API');
  console.log('8. Exit\n');
  read.question('Enter your choice: ', handleMenuChoice);
}

function handleMenuChoice(ch) {
  switch (ch) {
    case '1':
      displayCatalog();
      break;
    case '2':
      read.question('Enter movie title: ', (title) => {
        read.question('Enter movie director: ', (director) => {
          read.question('Enter release year: ', (year) => {
            read.question('Enter genre: ', (genre) => {
              addMovie(title, director, year, genre);
              displayMenu();
            });
          });
        });
      });
      break;
    case '3':
      read.question('Enter the movie title to update: ', (title) => {
        read.question('Enter the new title: ', (newTitle) => {
          read.question('Enter the new director: ', (newDirector) => {
            read.question('Enter the new release year: ', (newYear) => {
              read.question('Enter the new genre: ', (newGenre) => {
                updateMovie(title, newTitle, newDirector, newYear, newGenre);
                displayMenu();
              });
            });
          });
        });
      });
      break;
    case '4':
      read.question('Enter the movie title to delete: ', (title) => {
        deleteMovie(title);
        displayMenu();
      });
      break;
    case '5':
      read.question('Enter the search keyword: ', (keyword) => {
        searchMovies(keyword);
        displayMenu();
      });
      break;
    case '6':
      read.question('Enter the filter criteria: ', (criteria) => {
        filterMovies(criteria);
        displayMenu();
      });
      break;
    case '7':
      fetchMoviesFromAPI();
      displayMenu();
      break;
    case '8':
      read.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
      break;
  }
}

displayMenu();
