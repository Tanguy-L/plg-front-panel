const Animation = {
  animateLandPage: () => {
    if (typeof gsap !== "undefined") {
      const letters = document.querySelectorAll(".title-login *");

      gsap.to(letters, {
        duration: 0.8,
        opacity: 1,
        delay: 0.2,
        y: 0,
        stagger: 0.05,
        ease: "back.out(1.7)",
        onComplete: () => console.log("Animation complete!"),
      });

      const containerInputs = document.querySelector("#login-container-inputs");

      gsap.to(containerInputs, {
        duration: 2,
        opacity: 1,
        delay: 0.2,
        ease: "back.out(1.7)",
      });
    } else {
      console.error(
        "GSAP is not loaded. Make sure to include the GSAP library.",
      );
    }
  },
};
export default Animation;
