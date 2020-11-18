import { Request, Response } from 'express';
import { merge } from 'lodash';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

import Exam from '@models/Exam';

class ExamController {
  public async index(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Exam);
    const exams = await repository.find({
      relations: ['employee', 'type', 'category'],
      order: { updatedAt: 'ASC' },
    });

    return res.status(200).json(exams);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(Exam);
    const exam = await repository.findOne(id);

    if (!exam) throw new AppError('Exame não encontrado', 404);

    return res.status(200).json(exam);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { employee, type, category, date } = req.body;

    const repository = getRepository(Exam);

    const exam = repository.create({ employee, type, category, date });
    await repository.save(exam);

    return res.status(201).json(exam);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { type, category, date } = req.body;

    const repository = getRepository(Exam);
    const exam = await repository.findOne(id);

    if (!exam)
      throw new AppError('Exame não encontrado ou não cadastrado', 404);

    merge(exam, { type, category, date });
    await repository.save(exam);

    return res.status(200).json(exam);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(Exam);
    const exam = await repository.findOne(id);

    if (!exam)
      throw new AppError('Exame não encontrado ou não cadastrado', 404);

    await repository.delete(id);

    return res.status(204).send();
  }
}

export default new ExamController();
