import Players from "../services/Players.js";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export class ListPlayers extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("template-list-players");
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
    this.showLoadingState();
  }

  handleSearch(query, members) {
    const filteredMembers = members.filter((member) => {
      const memberName = member.name.toLowerCase();
      if (query === "" || memberName.includes(query.toLowerCase())) {
        return true;
      }
    });
    return filteredMembers;
  }

  connectedCallback() {
    if (window.app.store.players && window.app.store.players.length > 0) {
      this.render();
    }

    window.addEventListener("players-changed", (event) => {
      this.render();
    });
  }

  handleFilter(el, storeEl) {
    if (el) {
      el.checked = window.app.store[storeEl];
      if (!el.hasEventListener) {
        el.hasEventListener = true;

        el.addEventListener("input", (event) => {
          event.stopPropagation();
          const value = window.app.store[storeEl];
          window.app.store[storeEl] = !value;
          this.render();
        });
      }
    }
  }

  showLoadingState() {
    const cardElement = this.root.querySelector("#card-players");
    if (cardElement) {
      // cardElement.innerHTML = '<nord-spinner size="xl"></nord-spinner>';
      cardElement.innerHTML = `
      <style>
        .skeleton-header {
          width: 30%;
        }
        .skeleton-paragraph nord-skeleton {
          margin: var(--n-space-m);
          width: 90%;
        }
      </style>
      <nord-skeleton effect="sheen" class="skeleton-header" slot="header"></nord-skeleton>
      <div class="skeleton-paragraph" class="n-margin-i-l">
        <nord-skeleton class="n-margin-i-l" effect="sheen"></nord-skeleton>
        <nord-skeleton class="n-margin-i-l" effect="sheen"></nord-skeleton>
        <nord-skeleton class="n-margin-i-l" effect="sheen"></nord-skeleton>
        <nord-skeleton class="n-margin-i-l" effect="sheen"></nord-skeleton>
        <nord-skeleton class="n-margin-i-l" effect="sheen"></nord-skeleton>
      </div>
      `;
    }
  }

  render() {
    const players = window.app.store.players;
    const cardElement = this.root.querySelector("#card-players");

    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    cardElement.innerHTML = `
      <style>
      .n-margin-be-m {
        margin-block-end: var(--n-space-m);
      }
      #table-players {
      overflow:auto;
      max-height: 75vh;
      }
      </style>
        <nord-table id="table-players">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>discordId</th>
                <th>steamId</th>
                <th>name</th>
                <th>weight</th>
                <th>isLoggedIn</th>
                <th>smokeColor</th>
                <th>actions</th>
              </tr>
            </thead>

            <tbody id="table-body-players"></tbody>
          </table>
        </nord-table>
    `;

    if (!players || players.length === 0) {
      this.showLoadingState();
      return;
    }

    const tbody = this.root.querySelector("#table-body-players");
    const table = this.root.querySelector("#table-players");

    if (!tbody) {
      console.error("Table body not found after recreation");
      return;
    }

    let scroll_last_post = window.app.store.scrollPosListPlayers;
    if (scroll_last_post) {
      table.scrollTop = scroll_last_post;
    }
    let ticking = false;

    // TOFIX need to save the scrollY after a rerender
    table.addEventListener("scroll", function (e) {
      scroll_last_post = table.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          window.app.store.scrollPosListPlayers = scroll_last_post;
          ticking = false;
        });
      }

      ticking = true;
    });

    const toggleConnectBtn = this.root.querySelector("#toggle-connect-players");
    const search = this.root.querySelector("#search-players");
    // const debouncedSearch = debounce((e) => {
    //   this.render();
    // }, 300);

    
    // search.addEventListener("input", debouncedSearch);
    search.addEventListener("keypress", (e) => {
      
      window.app.store.searchMember = e.target.value;
      if (e.key === "Enter") {
        this.render();
      }
    });

    toggleConnectBtn.addEventListener("click", async () => {
      const isMembersLogged = window.app.store.isMembersLogged;
      await Players.toggleConnectionMember(isMembersLogged);
      const text = !isMembersLogged ? "Tous connecté" : "Tous déconnecté";
      const variant = !isMembersLogged ? "primary" : "danger";
      toggleConnectBtn.variant = variant;
      toggleConnectBtn.innerText = text;
      window.app.store.isMembersLogged = !isMembersLogged;
    });

    tbody.innerHTML = "";

    const toggleOnlyConnected = this.root.querySelector(
      "#only-connected-players",
    );

    this.handleFilter(toggleOnlyConnected, "onlyMembersConnected");

    const toggleOnlyDisconnected = this.root.querySelector(
      "#only-disconnected-players",
    );

    this.handleFilter(toggleOnlyDisconnected, "onlyMembersDisconnected");

    let playersFiltered = players;

    if (window.app.store.onlyMembersConnected) {
      playersFiltered = players.filter((e) => e.isLoggedIn);
    }

    if (window.app.store.onlyMembersDisconnected) {
      playersFiltered = playersFiltered.filter((e) => !e.isLoggedIn);
    }

    
    if (window.app.store.searchMember !== "") {
      
      
      playersFiltered = this.handleSearch(
        window.app.store.searchMember,
        playersFiltered,
      );
      // playersFiltered = playersFiltered.filter((e) =>
      //   e.name.includes(window.app.store.searchMember),
      // );
    }

    playersFiltered.forEach((player) => {
      const row = document.createElement("tr", { is: "row-player" });
      row.dataset.id = player.id;
      tbody.appendChild(row);
    });

    if (typeof gsap !== "undefined") {
      if (app.store.firstRender) {
        gsap.fromTo(
          cardElement,
          {
            opacity: 0,
            y: 100,
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 2,
          },
        );
        gsap.fromTo(
          tbody.children,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.05,
            ease: "power2.out",
          },
        );
        app.store.firstRender = false;
      }
    }
  }
}

customElements.define("list-players", ListPlayers);
