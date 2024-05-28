import { LitElement, html, CSSResultGroup, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { baseStyle } from "../../base";
import { PodIcon } from "../../../assets/icons/pod.icon";
import { Validation } from "../../../utils/validation.util";
import { RealLoginValidationDTO } from "./real-login.dto";
import { realLoginFormCss } from "./real-login-form.styles";
import { FormStateType } from "./real-login-form.types";
import { FormValidator } from "../../../utils/formValidator";

@customElement("real-login-form")
class RealLoginForm extends LitElement {
  @query(".phone-number-input") phoneNumberInput!: HTMLInputElement;
  @property({ type: String }) private phoneNumber: string = "";
  @property({ type: Boolean, reflect: true }) private hasError: boolean = false;
  @state() private formState: FormStateType = { phoneNumber: "" };

  private async numberValidation() {
    const phoneNumber = this.phoneNumberInput.value;

    const validator = new FormValidator(RealLoginValidationDTO, {
      phoneNumber,
    });
    const { isValid, formState } = await validator.validateForm();

    this.formState = formState;
    this.hasError = !isValid;
    return isValid;
  }

  private async handleGetRealLoginOTP(e: Event) {
    e.preventDefault();
    const isNumberValid = await this.numberValidation();
    if (!isNumberValid) return;

    const event = new Event("realUserLoggedIn", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    return [baseStyle, realLoginFormCss];
  }

  render() {
    return html`
      <form class="real-login-form" @submit="${this.handleGetRealLoginOTP}">
        <legend class="form-title">ورود کاربر حقیقی</legend>
        <div class="input-container">
          <input
            @change="${this.numberValidation}"
            type="tel"
            class="phone-number-input"
            placeholder="شماره تلفن همراه"
            maxlength="11"
            value="${this.phoneNumber}"
          />
          <span class="phone-number-input-error">
            ${this.formState.phoneNumber || nothing}
          </span>
        </div>
        <button class="get-otp-btn" type="submit" ?disabled="${this.hasError}">
          دریافت کد تایید
        </button>
        <button class="login-with-pod-btn">
          <span class="login-with-pod-icon">${PodIcon()}</span>
          ورود با حساب کاربری پاد
        </button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "real-login-form": RealLoginForm;
  }
}
