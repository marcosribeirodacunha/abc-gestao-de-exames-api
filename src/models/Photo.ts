import fs from 'fs';
import path from 'path';
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

import uploadConfig from '@config/upload';

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
    return fs.promises.unlink(path.resolve(uploadConfig.directory, this.key));
  }
}

export default Photo;
