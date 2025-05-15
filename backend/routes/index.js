// routes/index.js
import express from 'express';
import { register, login } from '../controllers/userController.js';
import { addComment, getCommentsByMovieId } from '../controllers/commentController.js';
import { searchMovies, getYears, getGenres, getCountries, getLanguages, getMovieById} from '../controllers/movieController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Agora importando corretamente a função

const router = express.Router();

// User routes
router.post('/register', register);
router.post('/login', login);

// Comment routes
router.post('/comments', authenticateToken, addComment);
router.get('/comments/:id/', getCommentsByMovieId)

// Movie search routes
router.get('/movies', searchMovies);
router.get('/movies/years', getYears);
router.get('/movies/genres', getGenres);
router.get('/movies/countries', getCountries);
router.get('/movies/languages', getLanguages);
router.get('/movies/:id', getMovieById);

export default router;

