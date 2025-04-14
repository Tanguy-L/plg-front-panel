import FormHandler from "../services/FormHandler.js";
import Teams from "../services/Teams.js";

export class TeamForm extends HTMLElement {
  constructor() {
    super();
  }

  async handleSubmit(e) {
    const valueSubmit = e.submitter.value;
    e.preventDefault();
    const data = this.formHandler.getValues();
    
    await Teams.updateTeam(data);
  }

  updateForm(team) {
    this.formHandler.setValues({
      id: team.id,
      channelId: team.channelId,
      name: team.name,
      isPlaying: team.isPlaying,
      side: team.side,
    });
  }

  connectedCallback() {
    const template = document.getElementById("team-form-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.formHandler = new FormHandler(this.querySelector("form"));
    this.setupFormHandler();
    
  }

  setupFormHandler() {
    const form = this.querySelector("form");
    form.addEventListener("submit", (e) => this.handleSubmit(e));
  }
}

customElements.define("team-form", TeamForm);
