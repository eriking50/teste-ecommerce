import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'timestamp', default: () => 'now()'})
  createdAt: Date;

  @Column({type: 'timestamp', default: () => 'now()'})
  updatedAt: Date;
}