import { URL_API } from "../config.js";
import AUTH from "./Auth.js";

const API = {
  fetchPlayers: async () => {
    try {
      const response = await AUTH.fetchWithAuth(URL_API + "/members");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  fetchTeams: async () => {
    const result = await AUTH.fetchWithAuth(URL_API + "/teams");
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

  updateMember: async (member) => {
    const { id, ...rest } = member;
    try {
      const response = await AUTH.fetchWithAuth(
        URL_API + `/members/${id}`,
        "PUT",
        JSON.stringify(member),
      );
      console.log(response);

      const data = response.data;
      if (response.status == "error") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteMember: async (id) => {
    try {
      const response = await AUTH.fetchWithAuth(
        URL_API + `/members/${id}`,
        "DELETE",
      );
      console.log(response);
      if (response.status == "error") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error(error);
    }
  },
};

export default API;
