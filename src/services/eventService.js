import * as modelo from '../models/eventModel.js';


export const getEventos = (filtros) => {
  return modelo.listarEventos(filtros);
};

export const getRelatorioEventos = (filtros) => {
  return modelo.relatorioEventos(filtros);
};

export const getEvento = (id) => modelo.buscarEventoPorId(id);

export const addEvento = (dados) => modelo.criarEvento(dados);

export const editEvento = (id, dados) => modelo.atualizarEvento(id, dados);

export const removeEvento = (id) => modelo.apagarEvento(id);
