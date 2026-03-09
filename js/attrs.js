import { el } from "./utils.js";

/**
 * Renderiza os cards de atributos dentro de `mount`.
 * @param {{ mount: HTMLElement, attributes: Array }} opts
 */
export function renderAttributes({ mount, attributes }) {
  mount.innerHTML = "";

  for (const attr of attributes) {
    const barWidth = Math.max(0, Math.min(100, attr.value * 10));

    const top = el("div", { class: "attrTop" }, [
      el("div", { class: "attrName", text: attr.name }),
      el("div", { class: "attrVal mono", text: `${attr.value}/10` }),
    ]);

    const bar = el("div", { class: "attrBar", "aria-hidden": "true" }, [
      el("span", { style: `width:${barWidth}%` }),
    ]);

    mount.appendChild(el("div", { class: "attrCard" }, [top, bar]));
  }
}
