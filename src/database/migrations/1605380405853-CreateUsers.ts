import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsers1605380405853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf', // It must be unique as well
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'registration_number',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_admin',
            type: 'boolean',
            default: false,
          },
          {
            name: 'photo_id',
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'job_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        columnNames: ['photo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'photos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['job_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'jobs',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
