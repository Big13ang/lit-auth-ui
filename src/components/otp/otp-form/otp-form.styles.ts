import { css } from "lit";

export const loginOtpFormStyle = css`
  .otp-form {
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 0.5rem;
  }

  .form-title {
    font-size: 1.25rem;
    text-align: center;
    font-weight: bold;
    color: var(--color-form-title);
  }

  .form-info {
    color: var(--disabled-color);
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
  }

  .otp-input {
    width: 100%;
    padding: 0.25rem 0.3rem;
    font-size: 0.8rem;
    border: 1px solid var(--input-border-color);
    color: var(--input-text-color);
    border-radius: 0.15rem;
    vertical-align: middle;
    line-height: 1.5;
    transition: all 0.3s ease;
  }

  .otp-input:focus {
    outline: none;
    border-color: var(--input-focus-color);
  }

  .otp-input-error {
    min-height: 1.25rem;
    font-size: 0.75rem;
    text-align: right;
    color: var(--input-error-message-color);
  }

  .login-btn {
    border: none;
    font-size: 0.85rem;
    background: var(--btn-get-otp-background);
    color: var(--btn-get-otp-color);
    padding: 0.25rem 0.5rem;
    border-radius: 0.15rem;
    transition: all 0.3s ease;
  }

  .login-btn:hover {
    background-color: color-mix(
      in srgb,
      var(--btn-get-otp-background) 100%,
      #fff 15%
    );
    cursor: pointer;
  }

  .login-btn:disabled {
    background-color: var(--disabled-background);
    color: var(--disabled-color);
    cursor: auto;
  }

  .resend-otp {
    border: none;
    font-size: 0.85rem;
    padding: 1rem 0.75rem;
    border-radius: 0.25rem;
    color: var(--btn-get-otp-background);
    background: transparent;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }

  .resend-otp:hover {
    cursor: pointer;
  }

  .edit-number {
    color: var(--btn-get-otp-background);
  }
`;
