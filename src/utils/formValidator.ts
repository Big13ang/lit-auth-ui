import { Validation } from "./validation.util";

export type FormStateType = Record<string, string>;

export class FormValidator {
  constructor(private DTO: new () => object, private values: object) {}

  async validateForm() {
    const validation = new Validation(this.DTO, this.values);
    const result = await validation.validate();

    let newFormState: FormStateType = {};
    if (result.errors) {
      for (let key in result.errors) {
        newFormState[key] = result.errors[key][0] || "";
      }
    }

    return {
      isValid: !result.errors,
      formState: newFormState,
    };
  }
}
