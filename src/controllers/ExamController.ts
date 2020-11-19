import { Request, Response } from 'express';
import { merge } from 'lodash';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

import Exam from '@models/Exam';

import examView from '@views/examView';

class ExamController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {
      employee = '',
      regist_number = '',
      job_id = '',
      exam_type_id = '',
      category_id = '',
      due_start = '',
      due_end = '',
    } = req.query;

    const repository = getRepository(Exam);
    const query = repository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.employee', 'employee')
      .leftJoinAndSelect('employee.job', 'job')
      .leftJoinAndSelect('employee.photo', 'photo')
      .leftJoinAndSelect('exam.type', 'type')
      .leftJoinAndSelect('exam.category', 'category')
      .where('employee.name ILIKE :employee', { employee: `%${employee}%` })
      .andWhere('employee.registration_number ILIKE :regist_number', {
        regist_number: `%${regist_number}%`,
      })
      .orderBy('exam.updated_at');

    if (job_id) query.andWhere('job.id = :job_id', { job_id });

    if (exam_type_id)
      query.andWhere('type.id = :exam_type_id', { exam_type_id });

    if (category_id)
      query.andWhere('category.id = :category_id', { category_id });

    if (due_start)
      query.andWhere('exam.date::date + type.expiration >= :due_start', {
        due_start,
      });

    if (due_end)
      query.andWhere('exam.date::date + type.expiration <= :due_end', {
        due_end,
      });

    const exams = await query.getMany();

    return res.status(200).json(examView.renderMany(exams));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(Exam);
    const exam = await repository.findOne(id, {
      relations: [
        'employee',
        'employee.photo',
        'employee.job',
        'type',
        'category',
      ],
    });

    if (!exam) throw new AppError('Exame não encontrado', 404);

    return res.status(200).json(examView.render(exam));
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
