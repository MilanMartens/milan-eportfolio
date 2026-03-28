/* ###################################
   SKILLS FILTER
################################### */

export function initSkills() {
  const skillsNumber = document.getElementsByClassName("skillsNumber")[0];
  const allBadges = document.getElementsByClassName("skill-badge");
  skillsNumber.innerHTML =
    allBadges.length - document.getElementsByClassName("skill-category").length;

  const categories = document.querySelectorAll(".skill-category");
  const subs = document.querySelectorAll(".skill-sub");

  subs.forEach((b) => b.classList.remove("skill-hidden"));

  categories.forEach((btn) => {
    btn.addEventListener("click", () => {
      categories.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.category;

      subs.forEach((badge) => {
        const match = filter === "all" || badge.dataset.category === filter;

        badge.classList.remove("skill-show");

        if (match) {
          badge.classList.remove("skill-hidden");
          void badge.offsetWidth;
          badge.classList.add("skill-show");
        } else {
          badge.classList.add("skill-hidden");
        }
      });
    });
  });
}

export function checkMobileFilter() {
  const allBtn = document.querySelector('[data-category="all"]');
  const jsBtn = document.querySelector('[data-category="javascript"]');

  if (window.innerWidth < 640) {
    allBtn?.classList.remove("active");
    jsBtn?.click();
  } else {
    allBtn?.click();
  }
}
