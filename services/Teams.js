import API from "./API.js";

export const teams = {
  loadData: async function () {
    const response = await API.fetchTeams();
    console.log(response);
    window.app.store.teams = response.data;
  },

  getTeamById: function (id) {
    return window.app.store.teams.find((team) => team.id === id);
  },
};

export default teams;
