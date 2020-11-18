import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

import authConfig from '@config/auth';

import User from '@models/User';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;

    /* Just while not validated by yup */
    if (!password)
      throw new AppError('E-mail/matrícula e/ou senha inválidos', 401);

    const repository = getRepository(User);
    const user = await repository.findOne({
      where: [{ email: login }, { registrationNumber: login }],
    });

    if (!user) throw new AppError('E-mail/matrícula e/ou senha inválidos', 401);

    if (!user.isAdmin)
      throw new AppError(
        'Apenas administradores podem acessar a plataforma',
        401,
      );

    if (!user.password)
      throw new AppError('Usuário não possui senha cadastrada', 401);

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword)
      throw new AppError('E-mail/matrícula e/ou senha inválidos', 401);

    const token = jwt.sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
      subject: user.id,
    });

    delete user.password;
    return res.status(201).json({ user, token });
  }
}

export default new SessionController();
