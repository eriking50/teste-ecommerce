import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';
import { OrderEntity } from './Order.entity';
import { TransactionPaymentType, TransactionStatus } from 'src/shared/enums/Transaction.enum';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({type: 'varchar'})
  orderId: string;

  @Column({type: 'integer'})
  totalValue: number;

  @Column({type: 'enum', enum: TransactionStatus })
  status: TransactionStatus

  @Column({type: 'enum', enum: TransactionPaymentType})
  paymentType: TransactionPaymentType

  @OneToOne(() => OrderEntity)
  @JoinColumn({name: 'orderId', referencedColumnName: 'id'})
  order: OrderEntity
}
