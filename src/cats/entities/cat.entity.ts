import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Cat extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  age: number;
  @Column({ type: 'varchar' })
  breed: string;
}
