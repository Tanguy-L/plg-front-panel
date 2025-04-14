import Teams from "../services/Teams.js";

export class RowTeam extends HTMLTableRowElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("row-team");
    if (!template) {
      console.error("Row team template not found!");
      return;
    }

    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }

  render() {
    const teamId = this.dataset.id;
    
    
    if (!teamId) {
      console.error("No team ID provided to row-team");
      return;
    }

    const team = window.app.store.teams.find((p) => p.id == teamId);
    if (!team) {
      console.error(`Player with ID ${teamId} not found`);
      return;
    }

    const typeBadge = team.isPlaying ? "success" : "danger";
    const textIsLoggedIn = team.isPlaying ? "Connecté" : "Déconnecté";

    const isLoggedInComponent = `<td><nord-badge variant="${typeBadge}">${textIsLoggedIn}</nord-badge></td>`;

    const tSideComponent = `<nord-stack direction="horizontal" align-items="center">
      <nord-icon color="var(--n-color-status-danger)" name="medical-death"></nord-icon>
      <nord-badge variant="danger">
          Terroriste
        </nord-badge>  </nord-stack>`;

    const ctSideComponent = `<nord-stack direction="horizontal" align-items="center"> 
      <nord-icon color="var(--n-color-status-infos)" name="interface-shield"></nord-icon> 
      <nord-badge variant="info">
      Contre-Terroriste
      </nord-badge> 
    </nord-stack>`;

    const sideComponent =
      team.side === "CounterTerrorist"
        ? ctSideComponent
        : team.side === "Terrorist"
          ? tSideComponent
          : "-";

    this.querySelector(".id").textContent = team.id;
    this.querySelector(".name").textContent = team.name || "-";
    this.querySelector(".channel").textContent = team.channelId || "-";
    this.querySelector(".side").innerHTML = sideComponent;
    this.querySelector(".is-playing").innerHTML = isLoggedInComponent;

    const editButton = this.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      window.app.store.modal = {
        isOpen: true,
        infos: team,
        type: "edit-team",
      };
    });

    const swapButton = this.querySelector(".swap-edit");
    swapButton.addEventListener("click", async (event) => {
      const teamUpdated = {};
      Object.assign(teamUpdated, team);
      teamUpdated.isPlaying = !team.isPlaying;
      Teams.updateTeam(teamUpdated);
    });
  }
}

customElements.define("row-team", RowTeam, { extends: "tr" });
