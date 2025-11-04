export interface BaseDTOValidator {
  validate: () => void | Promise<void>
}
