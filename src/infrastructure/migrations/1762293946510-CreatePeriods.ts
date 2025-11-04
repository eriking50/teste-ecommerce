import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeriods1762293946510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE "periods" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "transactionId" uuid NOT NULL,
        "subscriptionId" uuid NOT NULL,
        "startDate" TIMESTAMP NOT NULL,
        "endDate" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_periods_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_periods_transactions" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_periods_subscriptions" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "periods"');
  }
}
