import "../src/index.tsx";
import { html } from "lit-html";

export default {
  parameters: {
  },
};

export const story1 = () => html` <mobile-time-picker nHours=24></mobile-time-picker> `;
