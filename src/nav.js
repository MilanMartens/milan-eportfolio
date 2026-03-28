/* ###################################
   NAVIGATIE
################################### */

export function initNav() {
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("navPanel");
  const closeBtn = document.getElementById("navClose");

  toggle.addEventListener("click", () => {
    panel.classList.add("open");
    toggle.classList.add("hidden");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle.classList.remove("hidden");
  });

  document.addEventListener("click", (e) => {
    if (
      panel.classList.contains("open") &&
      !panel.contains(e.target) &&
      e.target !== toggle
    ) {
      panel.classList.remove("open");
      toggle.classList.remove("hidden");
    }
  });

  panel.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("open");
      toggle.classList.remove("hidden");
    });
  });
}
