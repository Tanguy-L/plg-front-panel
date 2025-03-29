import API from "./API.js";
import { convertKeysToCamelCase } from "./Helpers.js";

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
      const { teamId, ...rest } = e;
      return {
        id: teamId,
        ...rest,
      };
    });

    console.log(niceFormatTeams);
    window.app.store.teams = niceFormatTeams;
  },

  getTeamById: function (id) {
    return window.app.store.teams.find((team) => team.id === id);
  },
};

export default teams;
