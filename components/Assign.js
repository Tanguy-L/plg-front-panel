export class Assign extends HTMLElement {
  constructor() {
    super();
  }

  dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    gsap.to(ev.target, {
      scale: 0.9,
      opacity: 0.8,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
    });
    console.log("element is dragged");
  }

  dragendHandler(ev) {
    // Reset element appearance if drag is cancelled
    gsap.to(ev.target, {
      scale: 1,
      opacity: 1,
      boxShadow: "none",
      duration: 0.3,
    });
  }

  dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
  }

  dragoverHandler(ev) {
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "move";
  }

  connectedCallback() {
    const template = document.getElementById("template-assign");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    // Get the draggable element
    const draggableElement = this.querySelector("#p1");
    draggableElement.addEventListener("dragstart", this.dragstartHandler);
    draggableElement.addEventListener("dragend", this.dragendHandler);

    const teamCards = this.querySelectorAll("nord-card");
    teamCards.forEach((el) => {
      const dropTarget = el;
      dropTarget.addEventListener("drop", this.dropHandler);
      dropTarget.addEventListener("dragover", this.dragoverHandler);
    });
  }
}

customElements.define("assign-page", Assign);
