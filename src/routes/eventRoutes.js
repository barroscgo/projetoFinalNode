import { Router } from 'express';
import {
  listar,
  obter,
  criar,
  atualizar,
  remover
} from '../controllers/eventController.js';
import { verificarToken, eOrganizador } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Lista eventos (com filtros opcionais)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra eventos a partir desta data
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra eventos até esta data
 *       - in: query
 *         name: localizacao
 *         schema:
 *           type: string
 *         description: Filtra eventos por localização (contém)
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/', verificarToken, listar);

/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Obtém um evento por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', verificarToken, obter);

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     tags:
 *       - Eventos
 *     summary: Cria um novo evento (organizadores/admins)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       403:
 *         description: Acesso negado (não é organizador)
 */
router.post('/', verificarToken, eOrganizador, criar);

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     tags:
 *       - Eventos
 *     summary: Atualiza um evento existente (organizadores/admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento atualizado
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', verificarToken, eOrganizador, atualizar);

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     tags:
 *       - Eventos
 *     summary: Remove um evento (organizadores/admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento removido
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', verificarToken, eOrganizador, remover);

export default router;
