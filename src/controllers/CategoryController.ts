import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Category from '@models/Category';

import categoryView from '@views/categoryView';

import AppError from '../errors/AppError';

class CategoryController {
  public async index(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Category);
    const categories = await repository.find({ order: { name: 'ASC' } });

    return res.status(200).json(categoryView.renderMany(categories));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(Category);
    const category = await repository.findOne(id);

    if (!category)
      throw new AppError('Categoria não encontrada ou não cadastrada', 404);

    return res.status(200).json(categoryView.render(category));
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const repository = getRepository(Category);
    const category = repository.create({ name });
    await repository.save(category);

    return res.status(201).json(category);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;

    const repository = getRepository(Category);
    const category = await repository.findOne(id);

    if (!category)
      throw new AppError('Categoria não encontrada ou não cadastrada', 404);

    category.name = name;
    await repository.save(category);

    return res.status(200).json(category);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getRepository(Category);
    const category = await repository.findOne(id);

    if (!category)
      throw new AppError('Categoria não encontrada ou não cadastrada', 404);

    await repository.remove(category);

    return res.status(204).json();
  }
}

export default new CategoryController();
