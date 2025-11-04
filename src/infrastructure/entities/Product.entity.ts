import {
  Entity,
  Column,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column({type: 'integer', default: 0})
  price: number;

  @Column({type: 'varchar', nullable: false})
  name: string;
}
