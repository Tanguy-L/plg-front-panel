import FormHandler from "../services/FormHandler.js";
import API from "../services/API.js";
import Store from "../services/Store.js";
import Auth from "../services/Auth.js";
import Players from "../services/Players.js";
import Animation from "../services/Animations.js";

export class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const data = this.formHandler.getValues();
    const { username, password } = data;
    const result = await Auth.login(username, password);
    if (result) {
      window.dispatchEvent(new CustomEvent("logged"));
      app.router.go("/players");
    } else {
      this.errorForm();
    }
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

    const inputPassword = this.querySelector("nord-input[name='password']");
    const buttonShowPassword = this.querySelector("#show-password");

    buttonShowPassword.addEventListener("click", (event) => {
      console.log("click");
      inputPassword.type =
        inputPassword.type == "password" ? "text" : "password";
    });

    const inputs = this.querySelectorAll("nord-input");
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        event.stopPropagation();
        const hasErrorAttribute = input.hasAttribute("error");
        if (hasErrorAttribute) {
          input.removeAttribute("error");
        }
      });
    });

    Animation.animateLandPage();
  }

  setupFormHandler() {
    const form = this.querySelector("form");
    form.addEventListener("submit", (e) => this.handleSubmit(e));
  }
}

customElements.define("login-page", LoginPage);
