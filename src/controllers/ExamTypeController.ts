import { Request, Response } from 'express';
import { merge } from 'lodash';
import { getRepository } from 'typeorm';

import ExamType from '@models/ExamType';

import examTypeView from '@views/examTypeView';

import AppError from '../errors/AppError';

class ExamTypeController {
  public async index(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(ExamType);
    const examTypes = await repository.find({ order: { name: 'ASC' } });

    return res.status(200).json(examTypeView.renderMany(examTypes));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(ExamType);
    const examType = await repository.findOne(id);

    if (!examType)
      throw new AppError('Tipo de exame não encontrado ou não cadastrado', 404);

    return res.status(200).json(examTypeView.render(examType));
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, expiration } = req.body;

    const repository = getRepository(ExamType);
    const examType = repository.create({ name, expiration });
    await repository.save(examType);

    return res.status(201).json(examType);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, expiration } = req.body;

    const repository = getRepository(ExamType);
    const examType = await repository.findOne(id);

    if (!examType)
      throw new AppError('Tipo de exame não encontrado ou não cadastrado', 404);

    merge(examType, { name, expiration });
    await repository.save(examType);

    return res.status(200).json(examType);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(ExamType);
    const examType = await repository.findOne(id);

    if (!examType)
      throw new AppError('Tipo de exame não encontrado ou não cadastrado', 404);

    await repository.remove(examType);

    return res.status(204).send();
  }
}

export default new ExamTypeController();
