// ========
// Reveal animations on scroll
// ========
const revealElements = document.querySelectorAll(".section, .project-card, .job-card, .education-card, .hero-content");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
};
