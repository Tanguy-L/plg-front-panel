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
    try {
      const response = await AUTH.fetchWithAuth(URL_API + "/teams");
      return response;
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

  toggleConnectionMembers: async (bool) => {
    const body = {
      is_logged_in: bool,
    };

    try {
      const response = await AUTH.fetchWithAuth(
        URL_API + `/members/connection`,
        "PATCH",
        JSON.stringify(body),
      );
      if (response.status == "error") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  updateTeam: async (team) => {
    const { id, ...rest } = team;
    try {
      const response = await AUTH.fetchWithAuth(
        URL_API + `/teams/${id}`,
        "PUT",
        JSON.stringify(team),
      );

      const data = response.data;
      if (response.status == "error") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  updateAssign: async (teamsAssigned) => {
    try {
      const response = await AUTH.fetchWithAuth(
        URL_API + `/team-members`,
        "PATCH",
        JSON.stringify(teamsAssigned),
      );

      const data = response[0];
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
