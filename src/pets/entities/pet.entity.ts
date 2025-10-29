import { BaseEntity } from 'src/base/base.entity';
import { Species } from 'src/common/enums';
import { QrPet } from 'src/qr_pets/entities/qr_pet.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class Pet extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  species: string;
  @Column({ type: 'varchar', enum: Species, default: Species.DOG })
  breed: string;
  @Column({ type: 'varchar' })
  address: string;
  @Column({ type: 'varchar' })
  gender: string;
  @Column({ type: 'varchar' })
  color: string;
  @Column({ type: 'varchar', nullable: true })
  img: string;
  @Column({ type: 'varchar', nullable: true })
  observations: string;
  @Column({ type: 'varchar', unique:true })
  phone: string;
  @DeleteDateColumn()
  deleteAt: Date;
  @Column({ type: 'varchar', default: 1 })
  age: number;
  @ManyToOne(() => User, (user) => user.pets)
  user: User;
  @OneToOne(() => QrPet, (qr) => qr.pet, { cascade: true })
  @JoinColumn()
  qrCode: QrPet;
}
