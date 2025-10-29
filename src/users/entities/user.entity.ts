import { BaseEntity } from 'src/base/base.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { RoleEnum } from '../enum/role.enum';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  lastName: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'boolean', default: false })
  verifyEmail: boolean;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  @DeleteDateColumn()
  deleteAt: Date;
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];
}
