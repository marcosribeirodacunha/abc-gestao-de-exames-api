import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import deletePhoto from '../helpers/deletePhoto';

@Entity('photos')
class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  defineLocalURL() {
    if (process.env.STORAGE_TYPE === 'local')
      this.url = `${process.env.APP_URL}/files/${this.key}`;
  }

  @BeforeRemove()
  deleteFile() {
    return deletePhoto(this.key);
  }
}

export default Photo;
