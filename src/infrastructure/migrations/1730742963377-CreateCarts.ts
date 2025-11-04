import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarts1730742963377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    await queryRunner.query(`
      CREATE TYPE "carts_status_enum" AS ENUM('OPEN', 'CLOSED');
    `);
    await queryRunner.query(`
      CREATE TABLE "carts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "status" "carts_status_enum" NOT NULL,
        "customerId" uuid NOT NULL,
        CONSTRAINT "PK_carts_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_carts_customers" FOREIGN KEY ("customerId") REFERENCES "customers"("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TYPE "public"."carts_status_enum"`);
  }
}
