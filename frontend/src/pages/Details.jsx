import React, { useState, useEffect } from 'react';
import styles from './Details.module.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4040';

function Details() {
  const movieId = window.location.pathname.split('/')[2];
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const [movieRes, commentsRes] = await Promise.all([
          fetch(`${API_URL}/api/movies/${movieId}`),
          fetch(`${API_URL}/api/comments/${movieId}`)
        ]);

        const movieData = await movieRes.json();
        const commentsData = await commentsRes.json();

        if (movieData.error) {
          alert(movieData.error);
          setMovie(null);
        } else {
          setMovie(movieData);
        }

        if (commentsData.error) {
          alert(commentsData.error);
          setComments([]);
        } else {
          setComments(commentsData);
        }
      } catch (error) {
        alert('Erro ao carregar detalhes do filme.');
        setMovie(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/movies/${movieId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText }),
      });

      if (res.ok) {
        setCommentText('');
        const resComments = await fetch(`${API_URL}/api/comments/${movieId}`);
        const dataComments = await resComments.json();
        setComments(dataComments);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Falha ao adicionar comentário');
      }
    } catch {
      alert('Erro na requisição.');
    }
  };

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (!movie) return <p className={styles.error}>Filme não encontrado</p>;

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Mflix</h1>
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>{movie.title}</h1>

        <div className={styles.movieInfoSection}>
          <div className={styles.posterWrapper}>
            <img
              src={movie.poster || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png'}
              alt={`Poster de ${movie.title}`}
              className={styles.poster}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png';
              }}
            />
          </div>

          <div className={styles.movieDetails}>
            <p><strong>Sinopse completa:</strong> {movie.fullplot}</p>
            <p><strong>Gêneros:</strong> {movie.genres?.join(', ')}</p>
            <p><strong>Diretores:</strong> {movie.directors?.join(', ')}</p>
            <p><strong>Escritores:</strong> {movie.writers?.join(', ')}</p>
            <p><strong>Ano:</strong> {movie.year}</p>
            <p><strong>Classificação:</strong> {movie.rated}</p>
            <p><strong>Países:</strong> {movie.countries?.join(', ')}</p>
            <p><strong>Idiomas:</strong> {movie.languages?.join(', ')}</p>
            <p><strong>IMDb - Nota:</strong> {movie.imdb?.rating || 'N/A'}</p>
            <p><strong>Tomatoes - Avaliação do público:</strong> {movie.tomatoes?.viewer?.rating || 'N/A'}</p>
            <p><strong>Tomatoes - Avaliação do crítico:</strong> {movie.tomatoes?.critic?.rating || 'N/A'}</p>
          </div>
        </div>

        <section className={styles.commentsSection}>
          <h2 className={styles.subTitle}>Comentários</h2>
          <div className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id || comment.id} className={styles.comment}>
                  <p>
                    <strong className={styles.commentAuthor}>{comment.name || 'Anônimo'}:</strong> {comment.text}
                  </p>
                </div>
              ))
            ) : (
              <p className={styles.noComments}>Sem comentários</p>
            )}
          </div>

          <h3 className={styles.addCommentTitle}>Adicionar Comentário</h3>
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <textarea
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className={styles.textarea}
              placeholder="Escreva seu comentário aqui..."
            />
            <button type="submit" className={styles.button}>
              Adicionar Comentário
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Details;

