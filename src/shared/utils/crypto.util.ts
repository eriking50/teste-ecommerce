import crypto from 'node:crypto'

export const getHash = (value: string) => {
  return crypto.createHash('sha256').update(value).digest('hex')
}