export default class ModalController {
  constructor() {
    this.modal = document.querySelector("#modal");
    this.setupListeners();
    this.currentContent = null;
    this.modal.addEventListener("cancel", (e) => {
      console.log(e);
    });
    this.modal.addEventListener("close", (e) => {
      console.log(e);
    });
  }

  setupListeners() {
    window.addEventListener("event-modal-changed", (event) => {
      const { isOpen, type, infos } = event.detail;
      console.log(event.detail);

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

  createLoginContent() {
    return `
      <h2 slot="header" id="title">Connexion</h2>
      <login-form></login-form>
      <nord-button-group slot="footer" variant="spaced">
        <nord-button expand form="login-form" value="cancel" @click="${this.closeModal.bind(this)}">
          Annuler
        </nord-button>
        <nord-button expand form="login-form" type="submit" value="add" variant="primary">
          Se connecter
        </nord-button>
      </nord-button-group>
    `;
  }

  openModal(type, data) {
    this.cleanup();

    console.log(data);

    switch (type) {
      case "edit-player":
        this.modal.innerHTML = this.createPlayerEditContent();
        if (data) {
          const form = this.modal.querySelector("player-form");
          form.updateForm(data);
          console.log(form);
        }

        break;
      case "login":
        this.modal.innerHTML = this.createLoginContent();
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
