import { ValidationError } from '../errors/Validation.error';
import { BaseDTOValidator } from '../interfaces/base.dto'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export class CreateCustomerDTO implements BaseDTOValidator {
  public name: string
  public email: string

  constructor(
    body: Record<string, any>
  ) {
    this.name = body?.name;
    this.email = body?.email;
  }

  validate() {
    if (!this.name) {
      throw new ValidationError(
        'name is Required on customer creation'
      )
    }

    if (!this.email || !this.email.match(EMAIL_REGEX)) {
      throw new ValidationError(
        'email is Required and be valid on customer creation'
      )
    }
  }
}

