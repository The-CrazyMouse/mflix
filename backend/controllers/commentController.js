// controllers/commentController.js
import Comment from '../models/comment.js';
import User from '../models/user.js';

export async function addComment(req, res) {
  const { movieId, content } = req.body;
  const userId = req.user.userId;

  try {
    // Fetch user info to get name and email
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });

    const comment = new Comment({
      name: user.name,
      email: user.email,
      movie_id: movieId,
      text: content,
      date: new Date()
    });

    await comment.save();
    res.status(201).json({ message: 'Comentário criado com sucesso', comment });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar comentário', error: err.message });
  }
}

export async function getCommentsByMovieId(req, res) {
  const movieId = req.params.id;
  console.log('Movie ID:', movieId); // Verifique se o ID está correto

  try {
    // Use movie_id from the schema
    const comments = await Comment.find({ movie_id: movieId });
    console.log('Comments found:', comments); // Verifique os comentários encontrados

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this movie' });
    }

    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err); // Imprime o erro no console
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
}

