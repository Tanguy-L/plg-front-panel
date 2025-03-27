import { URL_API } from "../config.js";
const urlLogin = URL_API + "/api/login";

const AUTH = {
  setTokens(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  },

  clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  isAuthenticated() {
    return !!this.getAccessToken();
  },

  async login(username, password) {
    try {
      console.log(urlLogin);
      const response = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      this.setTokens(data.access_token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  async fetchWithAuth(url, options = {}) {
    const headers = options.headers || {};
    headers["Authorization"] = `Bearer ${this.getAccessToken()}`;

    let response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.logout();
    }

    return response.json();
  },

  logout() {
    this.clearTokens();
    app.router.go("/login");
  },
};

export default AUTH;
