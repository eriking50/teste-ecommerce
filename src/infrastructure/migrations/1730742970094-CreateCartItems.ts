import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartItems1730742970094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    await queryRunner.query(`
      CREATE TYPE "cart_items_type_enum" AS ENUM('single', 'subscription');
    `);
    await queryRunner.query(`
      CREATE TYPE "cart_items_periodicity_enum" AS ENUM('monthly', 'quarterly', 'yearly');
    `);
    await queryRunner.query(`
      CREATE TABLE "cart-items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "cartId" uuid NOT NULL,
        "productId" uuid NOT NULL,
        "type" "cart_items_type_enum" NOT NULL,
        "quantity" integer NOT NULL,
        "price" integer NOT NULL,
        "periodicity" "cart_items_periodicity_enum",
        CONSTRAINT "PK_cart_items_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_cart_items_cart" FOREIGN KEY ("cartId") REFERENCES "carts"("id"),
        CONSTRAINT "FK_cart_items_product" FOREIGN KEY ("productId") REFERENCES "products"("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove a tabela cart-items
    await queryRunner.query(`DROP TABLE "cart-items"`);

    // Remove os tipos ENUM
    await queryRunner.query(`DROP TYPE "public"."cart_items_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cart_items_periodicity_enum"`);
  }
}
