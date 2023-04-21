import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user_detail' })
export class UserDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userUUID: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  birthDate: string;

  @Column({ type: 'int', nullable: true })
  localCode: number;

  @Column({ type: 'tinyint', nullable: true })
  employStatus: number;

  @Column({ type: 'tinyint', nullable: true })
  carrerYear: number;

  @Column({ type: 'tinyint', nullable: true })
  education: number;

  @Column({ type: 'varchar', length: 6, nullable: true })
  major: string;
  @Column({ type: 'simple-array', nullable: true })
  computerSkill: number[];

  @Column({ type: 'simple-array', nullable: true })
  preferential: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
