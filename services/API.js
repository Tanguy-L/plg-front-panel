import { URL_API } from "../config.js";
import AUTH from "./Auth.js";

const API = {
  fetchPlayers: async () => {
    try {
      const response = await AUTH.fetchWithAuth(URL_API + "/api/members");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  fetchTeams: async () => {
    const result = await fetch(URL_API + "/api/teams");
    try {
      const data = await result.json();
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  },
};

export default API;
