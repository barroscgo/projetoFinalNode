import express from 'express';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';  
import relatorioRoutes from './routes/relatorioRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';



dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/eventos', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/relatorios', relatorioRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
