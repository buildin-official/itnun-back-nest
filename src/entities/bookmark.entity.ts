import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'policy_bookmark' })
export class PolicyBookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  bookmarkID: string;

  @Column({ type: 'uuid', nullable: false })
  userUUID: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  policyID: string;

  @CreateDateColumn()
  created_at: Date;
}

@Entity({ name: 'place_bookmark' })
export class PlaceBookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  bookmarkID: string;

  @Column({ type: 'uuid', nullable: false })
  userUUID: string;

  @Column({ type: 'varchar', length: 12, nullable: false })
  placeID: string;

  @CreateDateColumn()
  created_at: Date;
}
@Entity({ name: 'recruit_bookmark' })
export class RecruitBookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  bookmarkID: string;

  @Column({ type: 'uuid', nullable: false })
  userUUID: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  recruitID: string;

  @CreateDateColumn()
  created_at: Date;
}

@Entity({ name: 'good_shop_bookmark' })
export class GoodShopBookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  bookmarkID: string;

  @Column({ type: 'uuid', nullable: false })
  userUUID: string;

  @Column({ type: 'int', nullable: false })
  goodShopID: number;

  @CreateDateColumn()
  created_at: Date;
}
