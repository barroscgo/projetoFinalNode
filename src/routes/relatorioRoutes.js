import { Router } from 'express';
import { verificarToken, eOrganizador } from '../middlewares/auth.js';
import { gerarRelatorio } from '../controllers/relatorioController.js';

const router = Router();

/**
 * @swagger
 * /api/relatorios/eventos:
 *   get:
 *     tags:
 *       - Relatórios
 *     summary: Gera relatório de eventos por período
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial do período
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final do período
 *     responses:
 *       200:
 *         description: Relatório gerado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relatorio'
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado
 */
router.get('/eventos', verificarToken, eOrganizador, gerarRelatorio);

export default router;
