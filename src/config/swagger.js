import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API - Sistema de Gerenciamento de Eventos',
    version: '1.0.0',
    description: `
    `,
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Servidor local' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      UserRegister: {
        type: 'object',
        required: ['nome_usuario','email','senha'],
        properties: {
          nome_usuario: { type: 'string', example: 'joaodasilva' },
          email:        { type: 'string', format: 'email', example: 'joao@ex.com' },
          senha:        { type: 'string', format: 'password', example: 'abc123' },
          papel_id:     { type: 'integer', example: 2 }
        }
      },
      UserLogin: {
        type: 'object',
        required: ['email','senha'],
        properties: {
          email: { type: 'string', format: 'email', example: 'joao@ex.com' },
          senha: { type: 'string', format: 'password', example: 'abc123' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          id:           { type: 'integer', example: 1 },
          nome_usuario: { type: 'string', example: 'joaodasilva' },
          email:        { type: 'string', example: 'joao@ex.com' },
          token:        { type: 'string', example: 'eyJhbGciOi...' }
        }
      },
      Event: {
        type: 'object',
        properties: {
          id:            { type: 'integer', example: 1 },
          nome:          { type: 'string', example: 'Workshop Node.js' },
          data_evento:   { type: 'string', format: 'date', example: '2025-09-10' },
          localizacao:   { type: 'string', example: 'Joinville' },
          descricao:     { type: 'string', example: 'Introdução ao Node e Express' },
          organizador_id:{ type: 'integer', example: 1 },
          criado_em:     { type: 'string', format: 'date-time', example: '2025-07-01T14:00:00Z' }
        }
      },
      Relatorio: {
        type: 'object',
        properties: {
          totalEventos:         { type: 'integer', example: 6 },
          eventosPorMes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                mes:        { type: 'string', example: '2025-08' },
                quantidade: { type: 'integer', example: 2 }
              }
            }
          },
          eventosPorLocalizacao: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                localizacao:{ type: 'string', example: 'Joinville' },
                quantidade: { type: 'integer', example: 3 }
              }
            }
          }
        }
      }
    }
  },
  security: [ { bearerAuth: [] } ]
};

const options = {
  swaggerDefinition,
  // procura JSDoc em todos os arquivos de rota
  apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
