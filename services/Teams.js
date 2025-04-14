import API from "./API.js";
import { convertKeysToCamelCase, parseTeamDataForDB } from "./Helpers.js";

export const teams = {
  loadData: async function () {
    const response = await API.fetchTeams();
    const { data } = response;

    if (!data) {
      console.error("No data provided from API");
      return;
    }

    const formattedData = data.map((e) => convertKeysToCamelCase(e));
    const niceFormatTeams = formattedData.map((e) => {
      const { teamId, isPlaying, ...rest } = e;
      return {
        isPlaying: !!isPlaying,
        id: teamId,
        ...rest,
      };
    });

    window.app.store.teams = niceFormatTeams;
  },

  updateTeam: async function (team) {
    try {
      const teamFormatted = parseTeamDataForDB(team);
      const data = await API.updateTeam(teamFormatted);
      if (data) {
        await this.loadData();
      }
    } catch (error) {
      console.error(error);
    }
  },

  generate: async function () {
    try {
      const data = await API.generateTeams();
      
      
      
      if (data) {
        await this.loadData();
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteMember: async function (id) {
    try {
      const response = await API.deleteMember(id);
      if (response) {
        await this.loadData();
      }
    } catch (error) {
      console.error(error);
    }
  },

  getTeamById: function (id) {
    return window.app.store.teams.find((team) => team.id === id);
  },
};

export default teams;
