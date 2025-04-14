export default class ModalController {
  constructor() {
    this.modal = document.querySelector("#modal");
    this.setupListeners();
    this.currentContent = null;
    this.modal.addEventListener("cancel", (e) => {
      
    });
    this.modal.addEventListener("close", (e) => {
      
    });
  }

  setupListeners() {
    window.addEventListener("event-modal-changed", (event) => {
      const { isOpen, type, infos } = event.detail;
      

      if (isOpen) {
        this.openModal(type, infos);
      } else {
        this.closeModal();
      }
    });
  }

  createPlayerEditContent(player) {
    return `
      <h2 slot="header" id="title">Edition d'un joueur</h2>
      <player-form></player-form>
      <nord-button-group slot="footer" variant="spaced">
        <nord-button expand form="player-form" value="cancel" @click="${this.closeModal.bind(this)}">
          Annuler
        </nord-button>
        <nord-button expand form="player-form" type="submit" value="add" variant="primary">
          Editer
        </nord-button>
      </nord-button-group>
    `;
  }

  createTeamEditContent(team) {
    return `
      <h2 slot="header" id="title">Edition d'une équipe</h2>
      <team-form></team-form>
      <nord-button-group slot="footer" variant="spaced">
        <nord-button expand form="player-form" value="cancel" @click="${this.closeModal.bind(this)}">
          Annuler
        </nord-button>
        <nord-button expand form="player-form" type="submit" value="add" variant="primary">
          Editer
        </nord-button>
      </nord-button-group>
    `;
  }

  openModal(type, data) {
    this.cleanup();

    

    switch (type) {
      case "edit-player":
        this.modal.innerHTML = this.createPlayerEditContent();
        if (data) {
          const form = this.modal.querySelector("player-form");
          form.updateForm(data);
          
        }

        break;
      case "edit-team":
        this.modal.innerHTML = this.createTeamEditContent();
        if (data) {
          const form = this.modal.querySelector("team-form");
          form.updateForm(data);
          
        }
    }

    this.modal.showModal();
  }

  closeModal() {
    this.modal.close();
    this.cleanup();
  }

  cleanup() {
    this.modal.innerHTML = "";
  }
}
