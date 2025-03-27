import AUTH from "./Auth.js";
import Players from "../services/Players.js";

const Router = {
  init: async () => {
    document.querySelectorAll("nord-nav-item").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    const isLogged = AUTH.isAuthenticated();
    // Router.go("/login");

    if (isLogged) {
      Router.go("/players");
      await Players.loadData();
    } else {
      Router.go("/login");
    }
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let layout = "layout-base";

    const processRoute = (currentRoute) => {
      const playerIdRegex = /^\/player-(?<id>\d+)$/;

      const allRoutes = [
        {
          predicate: (url) => url === "/players",
          execute: () => {
            layout = "layout-connected";
            return document.createElement("list-players");
          },
        },
        {
          predicate: (url) => url === "/teams",
          execute: () => {
            layout = "layout-connected";
            return document.createElement("list-teams");
          },
        },
        {
          predicate: (url) => url === "/assign",
          execute: () => {
            layout = "layout-connected";
            return document.createElement("assign-page");
          },
        },
        {
          predicate: (url) => url === "/login",
          execute: () => {
            layout = "layout-base";
            return document.createElement("login-page");
          },
        },
        {
          predicate: (url) => playerIdRegex.test(url),
          execute: () => {
            layout = "layout-connected";
            const element = document.createElement("h1");
            const id = currentRoute.match(playerIdRegex).groups.id;
            element.textContent = `Player Id page ${id}`;
            return element;
          },
        },
      ];

      for (const routePage of allRoutes) {
        if (routePage.predicate(currentRoute)) {
          return routePage.execute();
        }
      }

      return null;
    };

    const pageElement = processRoute(route);
    const layoutDocument = document.querySelector("#" + layout);
    const otherLayout =
      layout === "layout-base" ? "layout-connected" : "layout-base";
    const otherLayoutDocument = document.querySelector("#" + otherLayout);

    Router.resetCacheLayout(otherLayoutDocument);
    Router.hideLayout(otherLayoutDocument);

    Router.resetCacheLayout(layoutDocument);
    Router.showLayout(layoutDocument);

    Router.addContent(layoutDocument, pageElement);
  },

  resetCacheLayout: (layout) => {
    const length = Router.getLengthLayout(layout);
    if (length) {
      const cache = layout.querySelector("main");
      for (let i = 0; i < length; i++) {
        cache.children[i].remove();
      }
    }
  },

  getLengthLayout: (layout) => {
    const cache = layout.querySelector("main");
    return cache.children.length;
  },

  addContent: (layout, pageElement) => {
    const cache = layout.querySelector("main");
    if (pageElement) {
      cache.appendChild(pageElement);
      window.scrollTo(0, 0);
    }
  },

  hideLayout: (layout) => {
    layout.style.visibility = "hidden";
  },

  showLayout: (layout) => {
    if (layout.style.visibility === "hidden") {
      layout.style.visibility = "visible";
    }
  },
};

export default Router;
