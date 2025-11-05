import {
	Entity,
	Column,
} from 'typeorm'
import { BaseEntity } from './BaseEntity';

@Entity('processed-events')
export class ProcessedEventEntity extends BaseEntity {
	@Column({type: 'varchar'})
	transactionId: string;

  @Column({type: 'varchar'})
	eventType: string;

  @Column({type: 'varchar'})
	hash: string;
}
