import { LitElement, html, CSSResultGroup, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { baseStyle } from "../../base";
import { PodIcon } from "../../../assets/icons/pod.icon";
import { realLoginFormCss } from "./legal-login-form.styles";
import { FormStateType } from "./legal-login-form.types";
import { LegalLoginFormDTO } from "./legal-login-form.dto";
import { FormValidator } from "../../../utils/formValidator";

@customElement("legal-login-form")
class LegalLoginForm extends LitElement {
  @query(".phone-number-input") phoneNumberInput!: HTMLInputElement;
  @query(".business-username-input") businessUsernameInput!: HTMLInputElement;
  @property({ type: Boolean, reflect: true }) hasError: boolean = false;

  @state() private phoneNumber: string = "";
  @state() private businessUsername: string = "";
  @state() private formState: FormStateType = {};

  private async formValidation() {
    const phoneNumber = this.phoneNumberInput.value;
    const businessUsername = this.businessUsernameInput.value;

    const validator = new FormValidator(LegalLoginFormDTO, {
      phoneNumber,
      businessUsername,
    });
    const { isValid, formState } = await validator.validateForm();

    this.formState = formState;
    this.hasError = !isValid;
    return isValid;
  }

  private getOtpMessage(e: Event) {
    e.preventDefault();
    if (this.hasError) {
      console.log("We have an error");
    } else {
      const event = new Event("legalUserLoggedIn", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  static get styles(): CSSResultGroup {
    return [baseStyle, realLoginFormCss];
  }

  render() {
    return html`
      <form class="real-login-form" @submit="${this.getOtpMessage}">
        <legend class="form-title">ورود کاربر حقیقی</legend>
        <div class="input-container">
          <input
            @change="${this.formValidation}"
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

        <div class="input-container">
          <input
            @change="${this.formValidation}"
            type="text"
            class="business-username-input"
            placeholder="نام کاربری کسب و کار"
            value="${this.businessUsername}"
          />
          <span class="business-username-input-error">
            ${this.formState.businessUsername || nothing}
          </span>
        </div>

        <button class="get-otp-btn" ?disabled="${this.hasError}" type="submit">
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
    "legal-login-form": LegalLoginForm;
  }
}
