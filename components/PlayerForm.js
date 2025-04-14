import FormHandler from "../services/FormHandler.js";
import Players from "../services/Players.js";

export class PlayerForm extends HTMLElement {
  constructor() {
    super();
  }

  async handleSubmit(e) {
    const valueSubmit = e.submitter.value;
    e.preventDefault();
    const data = this.formHandler.getValues();
    await Players.updateMember(data);
  }

  updateForm(player) {
    this.formHandler.setValues({
      id: player.id,
      discordId: player.discordId,
      isLoggedIn: player.isLoggedIn,
      name: player.name,
      smokeColor: player.smokeColor,
      steamId: player.steamId,
      weight: player.weight,
    });
  }

  connectedCallback() {
    const template = document.getElementById("player-form-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.formHandler = new FormHandler(this.querySelector("form"));
    this.setupFormHandler();
  }

  setupFormHandler() {
    const form = this.querySelector("form");
    form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  // render() {
  //   const modalInfos = Store.modal;
  //   
  // }
}

customElements.define("player-form", PlayerForm);
