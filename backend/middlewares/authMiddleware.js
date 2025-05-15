// middlewares/authMiddleware.js
import jwtConfig from '../jwt.js'; // Usando import para carregar o jwtConfig

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtém o token do cabeçalho
  console.log('Token recebido:', token); // Adiciona um log para verificar se o token foi passado

  if (!token) return res.status(401).json({ message: 'Token ausente' });

  try {
    req.user = jwtConfig.verifyToken(token); // Verifica o token
    console.log('Token verificado:', req.user); // Adiciona log para ver o usuário decodificado
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error); // Log do erro para ver o que deu errado
    res.status(401).json({ message: 'Token inválido' });
  }
};

