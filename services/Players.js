import API from "./API.js";
import { convertKeysToCamelCase } from "./Helpers.js";

export const players = {
  loadData: async function () {
    try {
      const data = await API.fetchPlayers();
      if (!data) {
        console.error("No data provided from API");
        return;
      }
      const formattedData = data.map((e) => convertKeysToCamelCase(e));
      const withName = formattedData.map((member) => {
        const { discordName, ...rest } = member;
        return {
          name: discordName,
          ...rest,
        };
      });
      window.app.store.players = withName;
    } catch (error) {
      console.error(error);
    }
  },

  getPlayerByID: function (id) {
    return window.app.store.players.find((player) => player.id === id);
  },
};

export default players;
