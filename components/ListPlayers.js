export class ListPlayers extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("template-list-players");
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
  }

  connectedCallback() {
    this.render();

    window.addEventListener("players-changed", (event) => {
      this.render();
    });
  }

  render() {
    const players = window.app.store.players;

    console.log(players);

    // FIXME if the cardelement is printed, the tbody is undefined (because we delete it)
    const cardElement = this.root.querySelector("#card-players");
    // gsap.to(cardElement, {
    //   opacity: 1,
    //   duration: 5,
    //   onComplete: () => {
    //     console.log("Finish !!!");
    //   },
    // });
    // if (!players || players.length === 0) {
    //   console.log("TEST");
    //   cardElement.innerHTML = '<nord-spinner size="xl"></nord-spinner>';
    //   return;
    // }
    const tbody = this.root.querySelector("#table-body-players");

    tbody.innerHTML = "";

    players.forEach((player) => {
      const row = document.createElement("tr", { is: "row-player" });
      row.dataset.id = player.id;
      tbody.appendChild(row);
    });

    if (typeof gsap !== "undefined") {
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
      // gsap.fromTo(
      //   tbody.children,
      //   {
      //     opacity: 0,
      //     y: 20,
      //   },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 0.3,
      //     stagger: 0.1,
      //     ease: "power2.out",
      //   },
      // );
    }
  }
}

customElements.define("list-players", ListPlayers);
