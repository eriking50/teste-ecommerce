import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';
import { CustomerEntity } from './Customer.entity';
import { CartEntity } from './Cart.entity';
import { TransactionEntity } from './Transaction.entity';
import { SubscriptionEntity } from './Subscription.entity';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Column({type: 'varchar'})
  customerId: string;

  @Column({type: 'varchar'})
  cartId: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({name: 'customerId', referencedColumnName: 'id'})
  customer?: CustomerEntity

  @ManyToOne(() => CartEntity)
  @JoinColumn({name: 'cartId', referencedColumnName: 'id'})
  cart?: CartEntity

  @OneToOne(() => TransactionEntity)
  transaction?: TransactionEntity

  @OneToMany(() => SubscriptionEntity, subscription => subscription.order)
  subscriptions: SubscriptionEntity[]
}
