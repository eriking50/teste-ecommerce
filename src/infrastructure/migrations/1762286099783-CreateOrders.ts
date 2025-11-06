import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1762286099783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "customerId" uuid NOT NULL,
        "cartId" uuid,
        CONSTRAINT "PK_orders_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_orders_customers" FOREIGN KEY ("customerId") REFERENCES "customers"("id"),
        CONSTRAINT "FK_orders_carts" FOREIGN KEY ("cartId") REFERENCES "carts"("id")
    )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "orders"');
  }
}
