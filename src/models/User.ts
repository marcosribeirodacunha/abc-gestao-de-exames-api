import { hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
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

  @OneToOne(type => Photo, { cascade: true })
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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 8);
    }
  }

  @BeforeRemove()
  deletePhoto() {
    const photoRepository = getRepository(Photo);
    photoRepository.findOne(this.photoId).then(photo => {
      if (photo) photoRepository.remove(photo);
    });
  }
}

export default User;
