import "../src/index.tsx";
import { html } from "lit-html";

export const story1 = () => html`
<mobile-time-picker></mobile-time-picker>
<style>
.mobile-time-picker {
  border-radius: 5px;
  background-color: hsl(174 36 64 / .7);
}

.time-option:has(input[checked]) {
  background-color: hsl(174 36 64);
}
</style>
`;
