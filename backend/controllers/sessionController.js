import Session from '../models/session.js';
import Movie from '../models/movie.js';
import Theater from '../models/theater.js';

// Create a new session
export async function addSession(req, res) {
  const { movieId, theaterId, date, time } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    const theater = await Theater.findById(theaterId);

    if (!movie || !theater) {
      return res.status(404).json({ message: 'Filme ou teatro não encontrados' });
    }

    const newSession = new Session({ movieId, theaterId, date, time });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar sessão', error: err.message });
  }
}

// Get all sessions for a particular movie
export async function getSessionsByMovie(req, res) {
  const { movieId } = req.params;
  try {
    const sessions = await Session.find({ movieId }).populate('theaterId', 'name location');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar sessões', error: err.message });
  }
}

