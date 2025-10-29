import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';

@Entity()
export class QrPet extends BaseEntity {
  @Column({ type: 'varchar'})
  qrData: string;
  @OneToOne(() => Pet, (pet) => pet.qrCode)
  @JoinColumn()
  pet: Pet;
}
