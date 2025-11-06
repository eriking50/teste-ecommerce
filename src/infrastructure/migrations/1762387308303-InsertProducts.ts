import { MigrationInterface, QueryRunner } from "typeorm";

const products = [
  { price: 10, name: "Assinatura Bronze" },
  { price: 25, name: "Assinatura Prata" },
  { price: 50, name: "Assinatura Ouro" },
  { price: 100, name: "Assinatura Diamante" },
];

export class InsertProducts1762387308303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (name, price)
      VALUES ${products
      .map(
        (p) => `('${p.name.replace(/'/g, "''")}', ${p.price})`
      )
      .join(",\n")};
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const names = products.map((p) => `'${p.name.replace(/'/g, "''")}'`).join(", ");
    await queryRunner.query(`
      DELETE FROM products WHERE name IN (${names});
    `);
  }
}
