import { CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { baseStyle } from "../../base";
import { countdownStyles } from "./count-down.styles";

const oneSecond = 1000;

@customElement("count-down")
class Countdown extends LitElement {
  // waitTime in second
  @property({ type: Number }) waitTime: number = 120;
  @state() minutes: number = 0;
  @state() seconds: number = 0;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("waitTime")) {
      this.setCountDown();
    }
  }

  static get styles(): CSSResultGroup {
    return [baseStyle, countdownStyles];
  }

  private calcTime() {
    const min = Math.floor(this.waitTime / 60);
    this.minutes = min;
    this.seconds = Math.floor(this.waitTime - min * 60);
  }

  private setCountDown() {
    this.calcTime();
    let timer = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        this.dispatchEvent(
          new CustomEvent("countdownCompleted", {
            bubbles: true,
            composed: true,
          })
        );
        clearInterval(timer);
        return;
      }

      if (this.seconds === 0) {
        this.minutes = this.minutes - 1;
        this.seconds = 59;
      }

      this.seconds = this.seconds - 1;
    }, oneSecond);
  }

  render() {
    return html`
      <div class="count-down">
        <span>${this.minutes}</span>:<span
          >${this.seconds < 10 ? `0${this.seconds}` : this.seconds} مانده تا
          دریافت مجدد کد</span
        >
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "count-down": Countdown;
  }
}
