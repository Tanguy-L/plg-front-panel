import FormHandler from "../services/FormHandler.js";
import API from "../services/API.js";
import Store from "../services/Store.js";
import Auth from "../services/Auth.js";
import Players from "../services/Players.js";

export class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  async handleSubmit(e) {
    console.log("test form");
    e.preventDefault();
    const data = this.formHandler.getValues();
    const { username, password } = data;
    const result = await Auth.login(username, password);
    if (result) {
      await Players.loadData();
      app.router.go("/players");
    } else {
      this.errorForm();
    }
    console.log(data);
  }

  updateForm() {
    this.formHandler.setValues({
      username: "",
      password: "",
    });
  }

  errorForm() {
    const inputs = this.querySelectorAll("nord-input");
    inputs.forEach((input) => {
      input.setAttribute("error", "Mauvais mot de passe ou nom d'utilisateur");
    });
  }

  connectedCallback() {
    const template = document.getElementById("login-page");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.formHandler = new FormHandler(this.querySelector("form"));
    this.setupFormHandler();

    const hiddenInputs = this.querySelectorAll("nord-input[type='password']");
    hiddenInputs.forEach((input) => {
      input.addEventListener("click", (event) => {
        input.type = input.type == "password" ? "text" : "password";
      });
    });

    const inputs = this.querySelectorAll("nord-input");
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        console.log("INPUT FIRE");
        const hasErrorAttribute = input.hasAttribute("error");
        if (hasErrorAttribute) {
          input.removeAttribute("error");
        }
      });
    });
  }

  setupFormHandler() {
    const form = this.querySelector("form");
    form.addEventListener("submit", (e) => this.handleSubmit(e));
  }
}

customElements.define("login-page", LoginPage);
