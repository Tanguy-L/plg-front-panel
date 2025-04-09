import API from "./API.js";
import { convertKeysToCamelCase, parseMemberDataForDB } from "./Helpers.js";

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
      withName.sort((a, b) => a.name.localeCompare(b.name));
      window.app.store.players = withName;
    } catch (error) {
      console.error(error);
      window.app.store.players = [];
      window.dispatchEvent(new CustomEvent("players-changed"));
    }
  },

  updateMember: async function (member) {
    try {
      const memberFormatted = parseMemberDataForDB(member);
      const data = await API.updateMember(memberFormatted);
      if (data) {
        await this.loadData();
      }
    } catch (error) {
      console.error(error);
    }
  },

  toggleConnectionMember: async function (isLoggedIn) {
    try {
      const data = await API.toggleConnectionMembers(isLoggedIn);

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

  getPlayerByID: function (id) {
    return window.app.store.players.find((player) => player.id === id);
  },
};

export default players;
