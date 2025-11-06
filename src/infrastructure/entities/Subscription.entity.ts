import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';
import { ProductEntity } from './Product.entity';
import { CustomerEntity } from './Customer.entity';
import { CartItemPeriodicity } from 'src/shared/enums/CartItem.enum';
import { SubscriptionStatus } from 'src/shared/enums/Subscription.enum';
import { PeriodEntity } from './Period.entity';

@Entity('subscriptions')
export class SubscriptionEntity extends BaseEntity {
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

  @OneToMany(() => PeriodEntity, period => period.subscription)
  periods: PeriodEntity[]
}
