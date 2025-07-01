import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

export const eOrganizador = async (req, res, next) => {
  const [rows] = await pool.query(
    'SELECT nome FROM papeis WHERE id = ?', 
    [req.user.papel_id]
  );
  if (rows[0]?.nome !== 'organizador' && rows[0]?.nome !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado: requer papel de organizador' });
  }
  next();
};
