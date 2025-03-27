export class Assign extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("template-assign");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("assign-page", Assign);
