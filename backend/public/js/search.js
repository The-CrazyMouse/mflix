document.addEventListener("DOMContentLoaded", async () => {
  async function fetchAndPopulate(url, selectId) {
    const values = await fetch(url).then(res => res.json());
    const select = document.getElementById(selectId);
    select.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All';
    select.appendChild(allOption);

    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  await Promise.all([
    fetchAndPopulate('/api/movies/genres', 'genres'),
    fetchAndPopulate('/api/movies/years', 'year'),
    fetchAndPopulate('/api/movies/countries', 'countries'),
    fetchAndPopulate('/api/movies/languages', 'languages'),
  ]);

  document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const genres = document.getElementById('genres').value;
    const year = document.getElementById('year').value;
    const countries = document.getElementById('countries').value;
    const languages = document.getElementById('languages').value;

    const queryParams = new URLSearchParams();
    if (title) queryParams.append('title', title);
    if (genres) queryParams.append('genres', genres);
    if (year) queryParams.append('year', year);
    if (countries) queryParams.append('countries', countries);
    if (languages) queryParams.append('language', languages);

    const movies = await fetch(`/api/movies?${queryParams}`).then(res => res.json());

    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    if (movies.length > 0) {
      movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
          <h3>${movie.title}</h3>
          <p><strong>Year:</strong> ${movie.year}</p>
          <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
          <p><strong>Countries:</strong> ${movie.countries.join(', ')}</p>
          <p><strong>Languages:</strong> ${movie.languages.join(', ')}</p>
          <a href="/movie/${movie._id}">View Details</a>
        `;
        moviesList.appendChild(movieDiv);
      });
    } else {
      moviesList.innerHTML = '<p>No movies found</p>';
    }
  });
});

