import {
	Entity,
	Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { CartItemType, CartItemPeriodicity } from '../../shared/enums/CartItem.enum';
import { BaseEntity } from './BaseEntity';
import { CartEntity } from './Cart.entity';
import { ProductEntity } from './Product.entity';

@Entity('cart-items')
export class CartItemEntity extends BaseEntity {
	@Column()
	cartId: string

  @Column()
  productId: string

  @Column({type: 'enum', enum: CartItemType})
  type: CartItemType
  
  @Column()
  quantity: number;

  @Column()
  price: number

  @Column({type: 'enum', enum: CartItemPeriodicity})
  periodicity?: CartItemPeriodicity

  @ManyToOne(() => CartEntity)
  @JoinColumn({name: 'cartId', referencedColumnName: 'id'})
  cart?: CartEntity

  @ManyToOne(() =>ProductEntity)
  @JoinColumn({name: 'productId', referencedColumnName: 'id'})
  product?: ProductEntity
}
