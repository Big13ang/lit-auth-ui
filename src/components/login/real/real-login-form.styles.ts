import { css } from "lit";

export const realLoginFormCss = css`
  .real-login-form {
    display: flex;
    flex-direction: column;
    width: 200px;
    gap: 0.5rem;
  }

  .form-title {
    font-size: 1.25rem;
    text-align: center;
    font-weight: bold;
    color: var(--color-form-title);
  }
  .input-container {
    display: flex;
    flex-direction: column;
  }

  .phone-number-input {
    width: 100%;
    padding: 0.25rem 0.3rem;
    font-size: 0.8rem;
    border: 1px solid var(--input-border-color);
    color: var(--fill-context-menu-icon);
    border-radius: 0.15rem;
    vertical-align: middle;
    line-height: 1.5;
    transition: all 0.3s ease;
  }

  .phone-number-input:focus {
    outline: none;
    border-color: var(--input-focus-color);
  }

  .phone-number-input-error {
    min-height: 1.25rem;
    font-size: 0.75rem;
    text-align: right;
    color: var(--input-error-message-color);
  }

  .get-otp-btn {
    border: none;
    font-size: 0.85rem;
    background: var(--btn-get-otp-background);
    color: var(--btn-get-otp-color);
    padding: 0.25rem 0.5rem;
    border-radius: 0.15rem;
    transition: all 0.3s ease;
  }

  .get-otp-btn:hover {
    background-color: color-mix(
      in srgb,
      var(--btn-get-otp-background) 100%,
      #fff 15%
    );
    cursor: pointer;
  }

  .get-otp-btn:disabled {
    background-color: var(--disabled-background);
    color: var(--disabled-color);
    cursor: auto;
  }

  .login-with-pod-btn {
    border: none;
    font-size: 0.85rem;
    background: var(--login-with-pod-btn-background);
    border: solid 1px var(--login-with-pod-border-color);
    color: var(--login-with-pod-btn-color);
    padding: 0.25rem 0.5rem;
    border-radius: 0.15rem;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }

  .login-with-pod-btn:hover {
    background-color: color-mix(
      in srgb,
      var(--login-with-pod-btn-background) 100%,
      var(--login-with-pod-border-color) 20%
    );

    color: var(--login-with-pod-btn-hover-color);
    cursor: pointer;
  }

  .login-with-pod-icon {
    width: 30px;
    display: inline-block;
  }
`;
