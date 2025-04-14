import Players from "../services/Players.js";

export class RowPlayer extends HTMLTableRowElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("row-player");
    if (!template) {
      console.error("Row player template not found!");
      return;
    }

    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }

  render() {
    const playerId = this.dataset.id;
    if (!playerId) {
      console.error("No player ID provided to row-player");
      return;
    }

    const player = window.app.store.players.find((p) => p.id == playerId);
    if (!player) {
      console.error(`Player with ID ${playerId} not found`);
      return;
    }

    const typeBadge = player.isLoggedIn ? "success" : "danger";
    const textIsLoggedIn = player.isLoggedIn ? "Connecté" : "Déconnecté";

    const isLoggedInComponent = `<td><nord-badge variant="${typeBadge}">${textIsLoggedIn}</nord-badge></td>`;

    this.querySelector(".id").textContent = player.id;
    this.querySelector(".discord-id").textContent = player.discordId || "-";
    this.querySelector(".steam-id").textContent = player.steamId || "-";
    this.querySelector(".name").textContent = player.name || "-";
    this.querySelector(".weight").textContent = player.weight || "-";
    this.querySelector(".is-logged-in").innerHTML = isLoggedInComponent;
    this.querySelector(".smoke-color").textContent = player.smokeColor || "-";

    this.querySelector(".name").style =
      "font-weight: var(--n-font-weight-strong);";

    const editButton = this.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      window.app.store.modal = {
        isOpen: true,
        infos: player,
        type: "edit-player",
      };
    });

    const swapButton = this.querySelector(".swap-edit");
    swapButton.addEventListener("click", async () => {
      const playerUpdated = {};
      Object.assign(playerUpdated, player);
      playerUpdated.isLoggedIn = !player.isLoggedIn;
      Players.updateMember(playerUpdated);
    });

    const deleteButton = this.querySelector(".delete");
    deleteButton.addEventListener("click", async (event) => {
      await Players.deleteMember(player.id);
      
    });
  }
}

customElements.define("row-player", RowPlayer, { extends: "tr" });
