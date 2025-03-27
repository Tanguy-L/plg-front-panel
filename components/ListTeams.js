export class ListTeams extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("template-list-teams");
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
  }

  connectedCallback() {
    this.render();

    window.addEventListener("teams-changed", (event) => {
      this.render();
    });
  }

  render() {
    const teams = window.app.store.teams;

    const cardElement = this.root.querySelector("#card-teams");
    if (!teams || teams.length === 0) {
      cardElement.innerHTML = '<nord-spinner size="xl"></nord-spinner>';
      return;
    }
    const tbody = this.root.querySelector("#table-body-teams");

    tbody.innerHTML = "";

    teams.forEach((team) => {
      const row = document.createElement("tr", { is: "row-team" });
      row.dataset.id = team.id;
      tbody.appendChild(row);
    });
  }
}

customElements.define("list-teams", ListTeams);
