import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Job from './Job';
import Photo from './Photo';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'registration_number', unique: true })
  registrationNumber: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ name: 'photo_id', type: 'uuid' })
  photoId: string;

  @OneToOne(type => Photo, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;

  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @ManyToOne(type => Job, job => job.users)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}

export default User;
