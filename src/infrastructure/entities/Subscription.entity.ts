import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';
import { OrderEntity } from './Order.entity';
import { ProductEntity } from './Product.entity';
import { CustomerEntity } from './Customer.entity';
import { CartItemPeriodicity } from 'src/shared/enums/CartItem.enum';
import { SubscriptionStatus } from 'src/shared/enums/Subscription.enum';

@Entity('subscriptions')
export class SubscriptionEntity extends BaseEntity {
  @Column({type: 'varchar'})
  orderId: string;

  @Column({type: 'varchar'})
  customerId: string;

  @Column({type: 'varchar'})
  productId: string;

  @Column({type: 'enum', enum: CartItemPeriodicity})
  periodicity: CartItemPeriodicity

  @Column({type: 'timestamp', nullable: true})
  nextBillingDate?: Date

  @Column({type: 'enum', enum: SubscriptionStatus})
  status: SubscriptionStatus
  
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({name: 'customerId', referencedColumnName: 'id'})
  customer: CustomerEntity

  @ManyToOne(() => ProductEntity)
  @JoinColumn({name: 'productId', referencedColumnName: 'id'})
  product: ProductEntity

  @ManyToOne(() => OrderEntity)
  @JoinColumn({name: 'orderId', referencedColumnName: 'id'})
  order: OrderEntity
}
