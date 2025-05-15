import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4040';

function Search() {
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [filters, setFilters] = useState({
    title: '',
    genres: '',
    year: '',
    countries: '',
    languages: '',
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAndPopulate = async (endpoint, setter) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    fetchAndPopulate('/api/movies/genres', setGenres);
    fetchAndPopulate('/api/movies/years', setYears);
    fetchAndPopulate('/api/movies/countries', setCountries);
    fetchAndPopulate('/api/movies/languages', setLanguages);
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const queryParams = new URLSearchParams();

    if (filters.title.trim()) queryParams.append('title', filters.title.trim());
    if (filters.genres) queryParams.append('genres', filters.genres);
    if (filters.year) queryParams.append('year', filters.year);
    if (filters.countries) queryParams.append('countries', filters.countries);
    if (filters.languages) queryParams.append('languages', filters.languages);

    try {
      const res = await fetch(`${API_URL}/api/movies?${queryParams.toString()}`);
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        Mflix
      </header>

      <div className={styles.container}>
        <h2 className={styles.title}>Search Movies</h2>
        <p className={styles.subtitle}>
          Use the filters below to find movies. Click on a movie to see details.
        </p>

        <form id="filterForm" onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter movie title"
            value={filters.title}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="genres">Genres:</label>
          <select
            id="genres"
            name="genres"
            value={filters.genres}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <label htmlFor="year">Year:</label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="countries">Countries:</label>
          <select
            id="countries"
            name="countries"
            value={filters.countries}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <label htmlFor="languages">Languages:</label>
          <select
            id="languages"
            name="languages"
            value={filters.languages}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">All</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>

          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>

        <div id="moviesList" className={styles.moviesGrid}>
          {loading ? (
            <p>Loading...</p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <a
                key={movie._id}
                href={`/movie/${movie._id}`}
                className={styles.movieCard}
              >
                <img
                  src={movie.poster || 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={movie.title}
                  className={styles.movieImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src ='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png';
                  }}
                />
                <p className={styles.movieTitle}>{movie.title}</p>
              </a>
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>

        <footer className={styles.footer}>
          © 2025 MovieDB. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Search;

