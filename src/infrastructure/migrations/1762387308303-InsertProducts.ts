import { MigrationInterface, QueryRunner } from "typeorm";

const products = [
  { id: "75d4879b-5321-43c4-8e6c-699497801ddd", price: 10, name: "Assinatura Bronze" },
  { id: "7b17db55-5381-4099-92c4-2cd36d99da7b", price: 25, name: "Assinatura Prata" },
  { id: "7b65e9f1-5257-4352-bcdf-60722c0313cc", price: 50, name: "Assinatura Ouro" },
  { id: "ce215b7c-eb16-4c82-9335-e2a545511017", price: 100, name: "Assinatura Diamante" },
];

export class InsertProducts1762387308303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (id, name, price)
      VALUES ${products
      .map(
        (product) => `('${product.id}',  '${product.name}', ${product.price})`
      )
      .join(",\n")};
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const ids = products.map((product) => `'${product.id}'`).join(", ");
    await queryRunner.query(`
      DELETE FROM products WHERE id IN (${ids});
    `);
  }
}
