import { HttpError } from "../errors/Base.error"

const ENVS_TO_VALIDATE = [
  'DB_HOST',
  'DB_NAME',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_PORT',
  'TEST_TOKEN',
  'WEBHOOK_AUTHORIZATION_TOKEN',
  'MAX_SUBSCRIPTION_ENDING_DAYS'
]

export const validateEnvs = () => {
  const errors = ENVS_TO_VALIDATE.filter((variable) => !process.env[variable])

  if (errors.length) {
    throw new HttpError(500, `The following envs needs are missing ${errors.join(' / ')}`)
  }
}