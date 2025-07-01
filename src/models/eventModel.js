import { pool } from '../config/db.js';

export const listarEventos = async ({ data_inicio, data_fim, localizacao }) => {
  
  let sql = 'SELECT * FROM eventos WHERE 1=1';
  const params = [];

  if (data_inicio) {
    sql += ' AND data_evento >= ?';
    params.push(data_inicio);
  }
  if (data_fim) {
    sql += ' AND data_evento <= ?';
    params.push(data_fim);
  }
  if (localizacao) {
    sql += ' AND localizacao LIKE ?';
    params.push(`%${localizacao}%`);
  }

  const [rows] = await pool.query(sql, params);
  return rows;
};

export const buscarEventoPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM eventos WHERE id = ?', [id]);
  return rows[0];
};

export const criarEvento = async ({ nome, data_evento, localizacao, descricao, organizador_id }) => {
  const sql = `
    INSERT INTO eventos (nome, data_evento, localizacao, descricao, organizador_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [nome, data_evento, localizacao, descricao, organizador_id]);
  return result.insertId;
};

export const atualizarEvento = async (id, campos) => {
  const sets = Object.keys(campos).map(key => `${key} = ?`).join(', ');
  const valores = [...Object.values(campos), id];
  const sql = `UPDATE eventos SET ${sets} WHERE id = ?`;
  await pool.execute(sql, valores);
};

export const apagarEvento = async (id) => {
  await pool.execute('DELETE FROM eventos WHERE id = ?', [id]);
};

export const relatorioEventos = async ({ data_inicio, data_fim }) => {
  const params = [];
  let filtro = 'WHERE 1=1';
  if (data_inicio) {
    filtro += ' AND data_evento >= ?';
    params.push(data_inicio);
  }
  if (data_fim) {
    filtro += ' AND data_evento <= ?';
    params.push(data_fim);
  }


  const [[{ totalEventos }]] = await pool.query(
    `SELECT COUNT(*) AS totalEventos FROM eventos ${filtro}`,
    params
  );


  const [eventosPorMes] = await pool.query(
    `SELECT DATE_FORMAT(data_evento,'%Y-%m') AS mes,
            COUNT(*) AS quantidade
     FROM eventos
     ${filtro}
     GROUP BY mes
     ORDER BY mes`,
    params
  );


  const [eventosPorLocalizacao] = await pool.query(
    `SELECT localizacao,
            COUNT(*) AS quantidade
     FROM eventos
     ${filtro}
     GROUP BY localizacao
     ORDER BY quantidade DESC`,
    params
  );

  return { totalEventos, eventosPorMes, eventosPorLocalizacao };
};

