import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Category from './Category';
import ExamType from './ExamType';
import User from './User';

@Entity('exams')
class Exams {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'employee_id' })
  employee: User;

  @ManyToOne(type => ExamType)
  @JoinColumn({ name: 'exam_type_id' })
  type: ExamType;

  @ManyToOne(type => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}

export default Exams;
