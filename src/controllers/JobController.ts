import { Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';

import Job from '@models/Job';

import jobView from '@views/jobView';

import AppError from '../errors/AppError';

class JobController {
  public async index(req: Request, res: Response): Promise<Response> {
    const jobRepository = getRepository(Job);
    const jobs = await jobRepository.find({
      order: { name: 'ASC' },
      where: { name: Not('Admin') },
    });

    return res.status(200).json(jobView.renderMany(jobs));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const jobRepository = getRepository(Job);
    const job = await jobRepository.findOne(id);

    if (!job) throw new AppError('Função não encontrada', 404);

    return res.status(200).json(jobView.render(job));
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!name) throw new AppError('O nome da função é obrigatório');

    const jobRepository = getRepository(Job);
    const job = jobRepository.create({ name });
    await jobRepository.save(job);

    return res.status(201).json(job);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) throw new AppError('O nome da função é obrigatório');

    const jobRepository = getRepository(Job);
    const job = await jobRepository.findOne(id);

    if (!job) throw new AppError('Função não encontrada', 404);

    job.name = name;
    jobRepository.save(job);

    return res.status(200).json(job);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const jobRepository = getRepository(Job);
    const job = await jobRepository.findOne(id);

    if (!job) throw new AppError('Função não encontrada', 404);

    jobRepository.delete(id);

    return res.status(204).send();
  }
}

export default new JobController();
