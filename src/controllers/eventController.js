import * as service from '../services/eventService.js';

export const listar = async (req, res, next) => {
  try {
    
    const { data_inicio, data_fim, localizacao } = req.query;

    const eventos = await service.getEventos({
      data_inicio,
      data_fim,
      localizacao
    });

    res.json(eventos);
  } catch (err) {
    next(err);
  }
};


export const obter = async (req, res, next) => {
  try {
    const evento = await service.getEvento(req.params.id);
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json(evento);
  } catch (err) {
    next(err);
  }
};

export const criar = async (req, res, next) => {
  try {
    const organizador_id = req.user.id;
    const id = await service.addEvento({ ...req.body, organizador_id });
    res.status(201).json({ id, ...req.body, organizador_id });
  } catch (err) {
    next(err);
  }
};

export const atualizar = async (req, res, next) => {
  try {
    await service.editEvento(req.params.id, req.body);
    res.json({ mensagem: 'Evento atualizado' });
  } catch (err) {
    next(err);
  }
};

export const remover = async (req, res, next) => {
  try {
    await service.removeEvento(req.params.id);
    res.json({ mensagem: 'Evento removido' });
  } catch (err) {
    next(err);
  }
};
