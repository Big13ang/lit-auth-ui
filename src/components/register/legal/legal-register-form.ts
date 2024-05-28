import { LitElement, html, CSSResultGroup, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { baseStyle } from "../../common/base";
import { legalRegisterFormCss } from "./legal-register.styles";
import { FormStateType } from "./legal-register.types";
import { LegalRegisterFormDTO } from "./legal-register-form.dto";
import { FormValidator } from "../../../utils/formValidator";

@customElement("legal-register-form")
class LegalRegisterForm extends LitElement {
  @query(".business-name-input") businessNameInput!: HTMLInputElement;
  @query(".business-username-input") businessUsernameInput!: HTMLInputElement;
  @query(".business-description-input")
  businessDescriptionInput!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) hasError: boolean = false;
  @state() private formState: FormStateType = {
    businessName: "",
    businessUsername: "",
    businessDescription: "",
  };

  private async formValidation() {
    const businessName = this.businessNameInput.value;
    const businessUsername = this.businessUsernameInput.value;
    const businessDescription = this.businessDescriptionInput.value;

    const validator = new FormValidator(LegalRegisterFormDTO, {
      businessName,
      businessUsername,
      businessDescription,
    });
    const { isValid, formState } = await validator.validateForm();

    this.formState = formState;
    this.hasError = !isValid;
    return isValid;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    if (this.hasError) return;

    const event = new Event("legalUserRegistered", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    return [baseStyle, legalRegisterFormCss];
  }

  render() {
    return html`
      <form class="legal-register-form" @submit="${this.handleSubmit}">
        <legend class="form-title">ثبت نام</legend>
        <p>ویژه کسب و کار ها و سازمان ها</p>

        <div class="input-container">
          <input
            type="text"
            class="business-name-input"
            placeholder="نام کسب‌وکار"
            @change="${this.formValidation}"
          />
          <span class="business-name-input-error">
            ${this.formState.businessName || nothing}
          </span>
        </div>

        <div class="input-container">
          <input
            type="text"
            class="business-username-input"
            placeholder="نام کاربری"
            @change="${this.formValidation}"
          />
          <span class="business-username-input-error">
            ${this.formState.businessUsername || nothing}
          </span>
        </div>

        <div class="input-container">
          <input
            type="text"
            class="business-description-input"
            placeholder="شرح فعالیت"
            @change="${this.formValidation}"
          />
          <span class="business-description-input-error">
            ${this.formState.businessDescription || nothing}
          </span>
        </div>

        <button class="get-otp-btn" type="submit" ?disabled="${this.hasError}">
          مرحله بعد
        </button>
        <div class="login-hint">
          حساب کاربری دارید؟
          <a href="#" class="login-link">وارد شوید</a>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "legal-register-form": LegalRegisterForm;
  }
}
