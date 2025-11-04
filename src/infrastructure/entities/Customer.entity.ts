import {
  Entity,
  Column,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  email: string
}
