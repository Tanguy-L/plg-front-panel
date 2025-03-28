export class ListPlayers extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("template-list-players");
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
    this.showLoadingState();
  }

  connectedCallback() {
    console.log("RENDER ListPlayers");
    if (window.app.store.players && window.app.store.players.length > 0) {
      this.render();
    }

    window.addEventListener("players-changed", (event) => {
      console.log("event players changed");
      this.render();
    });
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
    console.log("RENDER CALLED");
    const players = window.app.store.players;
    console.log(players);

    const cardElement = this.root.querySelector("#card-players");

    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    cardElement.innerHTML = `
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

    if (!tbody) {
      console.error("Table body not found after recreation");
      return;
    }

    tbody.innerHTML = "";

    players.forEach((player) => {
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
