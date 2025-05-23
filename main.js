import { ListPlayers } from "./components/ListPlayers.js";
import { ListTeams } from "./components/ListTeams.js";
import { Assign } from "./components/Assign.js";
import { RowPlayer } from "./components/RowPlayer.js";
import { RowTeam } from "./components/RowTeam.js";
import { PlayerForm } from "./components/PlayerForm.js";
import { LoginPage } from "./components/LoginPage.js";
import { TeamForm } from "./components/TeamForm.js";
import Players from "./services/Players.js";
import Teams from "./services/Teams.js";
import AUTH from "./services/Auth.js";

import API from "./services/API.js";
import ModalController from "./services/ModalController.js";
import Store from "./services/Store.js";
import Router from "./services/Router.js";

const app = {};

window.app = app;
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
  window.addEventListener("logged", async (event) => {
    await Players.loadData();
    await Teams.loadData();
  });
  new ModalController();
  app.router.init();

  const loginButton = document.querySelector("#logout");
  loginButton.addEventListener("click", () => {
    AUTH.logout();
  });
});
