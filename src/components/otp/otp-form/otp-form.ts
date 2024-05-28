import { CSSResultGroup, LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { baseStyle } from "@shared/ui";
import { FormValidator } from "@shared/utils";
import { loginOtpFormStyle } from "./otp-form.styles";
import { FormStateType } from "./otp-form.types";
import "../count down/count-down";
import { OTPFormValidationDTO } from "./otp-form.dto";

@customElement("otp-form")
class OtpForm extends LitElement {
  @query(".otp-input") otpInputElement!: HTMLInputElement;

  @property({ type: String }) phoneNumber: string = "";
  @property({ type: String }) otp: string = "";
  @property({ type: Number }) otpLength: number = 6;
  @property({ type: Boolean, reflect: true }) hasError: boolean = false;

  @state() shouldWaiting: boolean = true;
  @state() formState: FormStateType = {
    otp: "",
  };

  private handleCountdownCompleted() {
    this.shouldWaiting = false;
  }

  private handleResendOtp() {
    this.shouldWaiting = true;
  }

  private renderCounter() {
    if (this.shouldWaiting) {
      return html`<count-down
        @countdownCompleted="${this.handleCountdownCompleted}"
      ></count-down>`;
    }

    return html`<button class="resend-otp" @click="${this.handleResendOtp}">
      دریافت مجدد کد
    </button>`;
  }

  private async validateOtp() {
    const otp = this.otpInputElement.value;

    const validator = new FormValidator(OTPFormValidationDTO, {
      otp,
    });
    const { isValid, formState } = await validator.validateForm();

    this.formState = formState;
    this.hasError = !isValid;
    return isValid;
  }

  private async handleLogin(e: Event) {
    e.preventDefault();
    const isOtpValid = await this.validateOtp();
    if (isOtpValid) {
      const event = new Event("otpGenerated", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  static get styles(): CSSResultGroup {
    return [baseStyle, loginOtpFormStyle];
  }

  protected render() {
    return html`<form class="otp-form" @submit="${this.handleLogin}">
      <h5 class="form-title">تایید شماره تلفن همراه</h5>
      <div class="form-info">
        <span>کد تایید به شماره ${this.phoneNumber} ارسال شد</span>
        <a href="#" class="edit-number">ویرایش شماره</a>
      </div>
      <div>
        <input
          class="otp-input"
          type="text"
          maxlength="${this.otpLength}"
          placeholder="کد تایید"
          @change="${this.validateOtp}"
          value="${this.otp}"
        />
        ${this.formState.otp
          ? html`<p class="otp-input-error">
              کد ارسالی را ${this.otpLength} رقمی را وارد نمایید
            </p>`
          : nothing}
      </div>
      ${this.renderCounter()}
      <button class="login-btn" type="submit">ورود</button>
    </form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "otp-form": OtpForm;
  }
}
