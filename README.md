
# 📅 Sistema de Gerenciamento de Eventos

Projeto desenvolvido como atividade prática para consolidar os conhecimentos adquiridos durante o curso, utilizando Node.js, Express, MySQL, JWT e boas práticas de desenvolvimento e documentação de APIs RESTful.

---

## 🔧 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL** (Railway)
- **JWT** (Autenticação)
- **Swagger** (Documentação da API)
- **Thunder Client / Postman** (Testes)
- **Render** (Deploy do backend)

---

## 🎯 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ Criação de eventos
- ✅ Listagem de eventos (com filtros por data e local)
- ✅ Geração de relatório por intervalo de datas
- ✅ Controle de acesso com papel de usuário

---

## 🔐 Autenticação

A autenticação é baseada em JWT. Para acessar rotas protegidas (como criação de eventos ou geração de relatórios), é necessário incluir o token no header:

```
Authorization: Bearer SEU_TOKEN
```

---

## 📌 Rotas da API

> Para detalhes completos, acesse a [Documentação Swagger](https://api-eventos-hgmr.onrender.com/api/docs/#/)

### 🧑‍💼 Auth

| Método | Rota               | Descrição               |
|--------|--------------------|-------------------------|
| POST   | `/api/auth/register` | Cadastro de usuário     |
| POST   | `/api/auth/login`    | Login e geração de token |

---

### 📅 Eventos

| Método | Rota              | Descrição                     |
|--------|-------------------|-------------------------------|
| POST   | `/api/eventos`    | Criar novo evento *(protegida)* |
| GET    | `/api/eventos`    | Listar todos os eventos       |
| GET    | `/api/eventos?data=YYYY-MM-DD&local=São Paulo` | Filtro por data e local |

---

### 📄 Relatórios

| Método | Rota                               | Descrição                            |
|--------|------------------------------------|----------------------------------------|
| GET    | `/api/relatorios/eventos?data_inicio=YYYY-MM-DD&data_fim=YYYY-MM-DD` | Relatório de eventos *(protegida)* |

---

## 🧪 Testes

Os testes da API foram realizados via:

- ✅ **Thunder Client** (Visual Studio Code)
- ✅ **Postman**

Exemplo de caso de teste:
- Entrada: cadastro de usuário com e-mail existente
- Saída esperada: erro 409 `E-mail já cadastrado`

---

## 🚀 Deploy

O sistema está hospedado via **Render**, e o banco de dados via **Railway**.

> 🔗 **API online:** (https://api-eventos-hgmr.onrender.com)

> 🔗 **Swagger:** (https://api-eventos-hgmr.onrender.com/api/docs/#/)


---
