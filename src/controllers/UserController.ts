import { Request, Response } from 'express';
import { isBoolean, mergeWith } from 'lodash';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

import User from '@models/User';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (!user) throw new AppError('Usuário não encontrado', 404);

    return res.status(200).json(user);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const {
      name,
      cpf,
      email,
      phone,
      registrationNumber,
      password,
      isAdmin,
      jobId,
    } = req.body;

    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({
      where: [{ email }, { registrationNumber }],
    });

    if (userExists?.email === email) throw new AppError('E-mail já cadastrado');

    if (userExists?.registrationNumber === registrationNumber)
      throw new AppError('Matricula já cadastrada');

    const data = {
      name,
      cpf,
      email,
      phone,
      registrationNumber,
      password,
      isAdmin,
      jobId,
      photo: {
        key: 'key',
        url: 'url',
      },
    };

    const user = userRepository.create(data);
    await userRepository.save(user);

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      cpf,
      email,
      phone,
      registrationNumber,
      password,
      isAdmin,
      jobId,
    } = req.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);

    if (email || registrationNumber) {
      const userExists = await userRepository.findOne({
        where: [{ email }, { registrationNumber }],
      });

      if (userExists) {
        if (userExists.email === email)
          throw new AppError('E-mail já cadastrado');

        if (userExists.registrationNumber === registrationNumber)
          throw new AppError('Matricula já cadastrada');
      }
    }

    const data = {
      name,
      cpf,
      email,
      phone,
      registrationNumber,
      password,
      isAdmin,
      jobId,
    };

    const updatedUser = mergeWith(user, data, (oldValue, newValue) => {
      if (isBoolean(oldValue && newValue)) return newValue;
    });

    await userRepository.save(updatedUser);

    return res.status(200).json(updatedUser);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (!user) throw new AppError('Usuário não encontrado', 404);

    await userRepository.delete(id);

    return res.status(204).send();
  }
}

export default new UserController();
