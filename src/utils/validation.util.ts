import { validate, ValidationError } from "class-validator";

type ValidationErrorsType = Record<string, string[]>;
type ValidationResponse<T> = { instance?: T; errors?: ValidationErrorsType };

export class Validation<T extends object> {
  private dtoInstance: T;

  constructor(DTO: new () => T, formData: Partial<T>) {
    this.dtoInstance = Object.assign(new DTO(), formData);
  }

  private errorParser(errors: ValidationError[]): ValidationErrorsType {
    const result: ValidationErrorsType = {};

    for (const error of errors) {
      result[error.property] = Object.values(
        error.constraints as Record<string, string>
      );
    }

    return result;
  }

  async validate(): Promise<ValidationResponse<T>> {
    const errors = await validate(this.dtoInstance);
    const response: ValidationResponse<T> = {
      instance: this.dtoInstance,
      errors: undefined,
    };

    if (errors.length > 0) {
      response.errors = this.errorParser(errors);
    }

    return response;
  }
}
