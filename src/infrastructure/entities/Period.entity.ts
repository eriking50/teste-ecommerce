import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';
import { TransactionEntity } from './Transaction.entity';
import { SubscriptionEntity } from './Subscription.entity';

@Entity('periods')
export class PeriodEntity extends BaseEntity {
  @Column({type: 'varchar'})
  transactionId: string;

  @Column({type: 'varchar'})
  subscriptionId: string;

  @Column({type: 'timestamp'})
  startDate: Date;

  @Column({type: 'timestamp'})
  endDate: Date;

  @ManyToOne(() => TransactionEntity)
  @JoinColumn({name: 'transactionId', referencedColumnName: 'id'})
  transaction: TransactionEntity

  @ManyToOne(() => SubscriptionEntity)
  @JoinColumn({name: 'subscriptionId', referencedColumnName: 'id'})
  subscription: SubscriptionEntity
}
