export class CardTeam extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("template-card-team");
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
  }

  connectedCallback() {}
}

customElements.define("card-team", CardTeam);
