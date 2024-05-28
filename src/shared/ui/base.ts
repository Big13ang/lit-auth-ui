import { css } from "lit";

export const baseStyle = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    direction: rtl;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: var(--font-family);
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  a {
    text-decoration: none;
  }
  input {
    outline: none;
  }

  #root,
  #__next {
    isolation: isolate;
  }
`;
