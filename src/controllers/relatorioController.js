import * as service from '../services/eventService.js';

export const gerarRelatorio = async (req, res, next) => {
  try {
    const { data_inicio, data_fim } = req.query;
    const rel = await service.getRelatorioEventos({ data_inicio, data_fim });
    res.json(rel);
  } catch (err) {
    next(err);
  }
};
