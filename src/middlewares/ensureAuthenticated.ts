import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from 'src/errors/AppError';

import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('Sem token de autenticação');

  const [prefix, token] = authHeader.split(' ');

  if (!prefix || !token) throw new AppError('Erro de formatação do token');

  if (!/^Bearer$/.test(prefix))
    throw new AppError('Erro de formatação do token');

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) throw new AppError('Token de autenticação inválido', 403);

    const { sub } = decoded as TokenPayload;

    req.user = { id: sub };
    next();
  });
}

export default ensureAuthenticated;
