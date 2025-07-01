import { pool } from '../config/db.js';

export const buscarUsuarioPorEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
};

export const criarUsuario = async ({ nome_usuario, email, senha_hash, papel_id = 3 }) => {
  const sql = `
    INSERT INTO usuarios (nome_usuario, email, senha_hash, papel_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [nome_usuario, email, senha_hash, papel_id]);
  return result.insertId;
};
