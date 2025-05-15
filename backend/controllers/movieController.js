import Movie from '../models/movie.js';
import Theater from '../models/theater.js';
import Session from '../models/session.js';

// Updated searchMovies function
export async function searchMovies(req, res) {
  const { title, genres, year, countries, language} = req.query;
  const query = {};

  // If title is provided, filter by it (case insensitive)
  if (title) query.title = { $regex: title, $options: 'i' };

  // Filter by genres if provided
  if (genres) query.genres = { $in: genres.split(',') };

  // Filter by year if provided
  if (year) query.year = parseInt(year);

  // Filter by countries if provided
  if (countries) query.countries = { $in: countries.split(',') };

  // Filter by language if provided
  if (language) query.language = language;


  try {
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar filmes', error: err.message });
  }
}

// Function to get all available years in the database
export async function getYears(req, res) {
  try {
    const years = await Movie.distinct('year');
    res.json(years);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar anos', error: err.message });
  }
}

// Function to get all available genres in the database
export async function getGenres(req, res) {
  try {
    const genres = await Movie.distinct('genres');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar gêneros', error: err.message });
  }
}

// Function to get all available countries in the database
export async function getCountries(req, res) {
  try {
    const countries = await Movie.distinct('countries');
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar países', error: err.message });
  }
}

// Function to get all available languages in the database
// controllers/movieController.js

export async function getLanguages(req, res) {
  try {
    const result = await Movie.aggregate([
      { $unwind: "$languages" },
      { $group: { _id: "$languages" } },
      { $sort: { _id: 1 } }
    ]);
    const languages = result.map((item) => item._id);
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter idiomas', error: err.message });
  }
}

// Function to get a specific movie by its ID
export async function getMovieById(req, res) {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movie', error: err.message });
  }
}

