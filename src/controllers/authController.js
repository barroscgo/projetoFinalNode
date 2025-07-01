import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as usuarioModel from '../models/usuarioModel.js';

const gerarToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

export const registrar = async (req, res, next) => {
  try {
    const { nome_usuario, email, senha } = req.body;
    if (await usuarioModel.buscarUsuarioPorEmail(email)) {
      return res.status(409).json({ erro: 'E-mail já cadastrado' });
    }
    const senha_hash = await bcrypt.hash(senha, 10);
    const id = await usuarioModel.criarUsuario({ nome_usuario, email, senha_hash });
    const token = gerarToken({ id, nome_usuario, papel_id: 3 });
    res.status(201).json({ id, nome_usuario, email, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    if (!await bcrypt.compare(senha, usuario.senha_hash)) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = gerarToken({
      id: usuario.id,
      nome_usuario: usuario.nome_usuario,
      papel_id: usuario.papel_id,
    });
    res.json({ id: usuario.id, nome_usuario: usuario.nome_usuario, email: usuario.email, token });
  } catch (err) {
    next(err);
  }
};
