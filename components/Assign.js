import Players from "../services/Players.js";

export class Assign extends HTMLElement {
  constructor() {
    super();
  }

  dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    gsap.to(ev.target, {
      scale: 0.9,
      opacity: 0.8,
      duration: 0.3,
    });
    console.log("element is dragged");
  }

  dragendHandler(ev) {
    // Reset element appearance if drag is cancelled
    gsap.to(ev.target, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });
  }

  dropHandler(ev) {
    ev.preventDefault();

    let dropTarget = ev.target;

    while (dropTarget && !dropTarget.classList.contains("player-container")) {
      dropTarget = dropTarget.parentElement;
      console.log(dropTarget.parentElement);

      if (dropTarget.tagName === "BODY" || !dropTarget) {
        return;
      }
    }

    const data = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);

    if (draggedElement && dropTarget) {
      // team-3
      const idNewTeam = Number(dropTarget.id.split("-")[1]);
      const player = Players.getPlayerByID(Number(data));
      const oldTeam = player.teamId;
      dropTarget.appendChild(draggedElement);

      if (idNewTeam !== oldTeam) {
        console.log("changed");
        draggedElement.classList.add(
          "n-color-status-info",
          "n-color-text-on-accent",
        );
      } else {
        draggedElement.classList.remove(
          "n-color-status-info",
          "n-color-text-on-accent",
        );
      }
      const payload = {
        idTeam: Number(idNewTeam),
        idPlayer: Number(player.id),
      };
      Players.togglePlayerByIdChanged(payload);
      console.log(window.app.store.playersAssigned);
    }
  }

  dragoverHandler(ev) {
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "move";
  }

  createPlayerElement(el, player) {
    const playerElement = document.createElement("div");
    playerElement.id = player.id;
    playerElement.className = "player";
    playerElement.draggable = true;
    playerElement.textContent = player.name;
    playerElement.addEventListener("dragstart", this.dragstartHandler);
    playerElement.addEventListener("dragend", this.dragendHandler);
    el.appendChild(playerElement);
  }

  render() {
    // Create base structure first
    this.innerHTML = `
      <style>
        .player-container {
          height: calc(100% - 20px);
          max-height: 400px;
          overflow: auto;
          padding: 10px;
        }

        .updated {
          background-color: 
      }

        .highlight {
          border: 2px dashed rgb(17, 118, 39) !important;
          background-color: rgba(124, 245, 113, 0.49) !important;
          border-radius: 4px;
        }
        
        .player {
          margin-bottom: 10px;
          padding: 12px;
          box-shadow: var(--n-box-shadow);
          border-radius: var(--n-border-radius-s);
          cursor: grab;
        }

        .teams-container {
        }
        
        .player:hover {
          border: 1px solid black;
        }
        
      </style>
      
      <h1>Team Assignment</h1>


        <nord-stack
          direction="horizontal"
          class="n-margin-be-m"
          align-items="start"
        >
          <nord-button id="assign-save-teams" variant="primary"
            >Sauvegarder</nord-button
          >
        </nord-stack>

      <nord-stack justify-content="center" direction="horizontal" class="teams-container" id="teams-container">
       </nord-stack>
    `;

    const buttonSave = this.querySelector("#assign-save-teams");
    buttonSave.addEventListener("click", async () => {
      await Players.updateAssign();
    });

    // -------------- PLAYERS
    const players = window.app.store.players;
    const playersConnected = players.filter((e) => e.isLoggedIn);
    const playersWithTeam = playersConnected.filter((e) => e.teamId);
    const playersWithoutTeam = playersConnected.filter((e) => !e.teamId);

    // --------------- TEAMS
    const teamsContainer = this.querySelector("#teams-container");
    const teams = window.app.store.teams.filter((team) => team.isPlaying);

    teams.forEach((team) => {
      // ------ CREATE TEAM CARD
      const teamCard = document.createElement("nord-card");
      teamCard.innerHTML = `
          <h2 slot="header">${team.name}</h2>
          <div class="player-container" id="team-${team.id}"></div>
        `;
      teamsContainer.appendChild(teamCard);
      // ------ END CREATE TEAM CARD

      const playerContainer = teamCard.querySelector(".player-container");
      playerContainer.addEventListener("drop", (ev) => {
        playerContainer.classList.remove("highlight");
        this.dropHandler(ev);
      });
      playerContainer.addEventListener("dragover", (ev) => {
        playerContainer.classList.add("highlight");
        this.dragoverHandler(ev);
      });

      playerContainer.addEventListener("dragleave", (ev) => {
        playerContainer.classList.remove("highlight");
      });

      let playersOfTeam = playersWithTeam.filter((e) => e.teamId === team.id);

      // ID FOR NO TEAM TEAM
      // Add members without any teams
      if (team.id === 4) {
        playersOfTeam = [...playersOfTeam, ...playersWithoutTeam];
      }

      playersOfTeam.forEach((player) => {
        this.createPlayerElement(playerContainer, player);
      });
    });
  }

  connectedCallback() {
    if (window.app.store.players && window.app.store.players.length > 0) {
      this.render();
    }

    window.addEventListener("players-changed", (event) => {
      this.render();
    });
  }
}

customElements.define("assign-page", Assign);
