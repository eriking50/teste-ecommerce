import { config } from "dotenv"
import { DataSource } from "typeorm"

config()

const TypeormDataSource = new DataSource({
	type: 'postgres',
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	synchronize: false,
	logging: false,
	entities: ['src/infrastructure/entities/**/*.ts'],
	migrations: ['src/infrastructure/migrations/**/*.ts'],
})

TypeormDataSource.initialize()

export default TypeormDataSource;