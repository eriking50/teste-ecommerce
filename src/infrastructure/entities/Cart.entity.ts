import {
	Entity,
	Column,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from 'typeorm'
import { CartStatus } from '../../shared/enums/Cart.enum';
import { BaseEntity } from './BaseEntity';
import { CustomerEntity } from './Customer.entity';
import { CartItemEntity } from './CartItem.entity';

@Entity('carts')
export class CartEntity extends BaseEntity {
	@Column({type: 'enum', enum: CartStatus, default: CartStatus.OPEN})
	status: CartStatus

	@Column({type: 'varchar'})
	customerId: string;

	@ManyToOne(() => CustomerEntity)
	@JoinColumn({name: 'customerId', referencedColumnName: 'id'})
	customer: CustomerEntity

	@OneToMany(() => CartItemEntity, cartItems => cartItems.cart)
	items: CartItemEntity[]
}
