import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactions1762287066241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TYPE "transaction_status_enum" AS ENUM('success', 'pending', 'failure');
    `);

    await queryRunner.query(`
      CREATE TABLE "transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "status" "transaction_status_enum" NOT NULL DEFAULT 'pending',
        "orderId" uuid NOT NULL,
        "totalValue" integer NOT NULL,
        "paymentType" varchar NOT NULL,
        CONSTRAINT "PK_transactions_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_transactions_orders" FOREIGN KEY ("orderId") REFERENCES "orders"("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "transactions"');
  }
}
