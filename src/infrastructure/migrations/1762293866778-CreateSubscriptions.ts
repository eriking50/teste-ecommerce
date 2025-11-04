import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptions1762293866778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TYPE "subscription_periodicity_enum" AS ENUM('monthly', 'quarterly', 'yearly');
    `);

    await queryRunner.query(`
      CREATE TYPE "subscription_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'CANCELLED');
    `);

    await queryRunner.query(`
      CREATE TABLE "subscriptions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "orderId" uuid NOT NULL,
        "customerId" uuid NOT NULL,
        "productId" uuid NOT NULL,
        "periodicity" "subscription_periodicity_enum" NOT NULL,
        "nextBillingDate" TIMESTAMP,
        "status" "subscription_status_enum" NOT NULL,
        CONSTRAINT "PK_subscriptions_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_subscriptions_orders" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_subscriptions_customers" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_subscriptions_products" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "subscriptions"');
    await queryRunner.query('DROP TYPE "subscription_periodicity_enum"');
    await queryRunner.query('DROP TYPE "subscription_status_enum"');
  }
}
