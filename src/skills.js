/* ###################################
   SKILLS FILTER
################################### */

export function initSkills() {
  setDataInHtmlFile();

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

function setDataInHtmlFile() {
  const skillsNumber = document.getElementsByClassName("skillsNumber")[0];
  const projectsNumber = document.getElementsByClassName("projectsNumber")[0];
  const allBadges = document.getElementsByClassName("skill-badge");
  const projectCategories = document.getElementsByClassName("project-category");

  projectsNumber.innerHTML =
    projectCategories.length > 10 ? "10+" : projectCategories.length;
  skillsNumber.innerHTML =
    allBadges.length - document.getElementsByClassName("skill-category").length;
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
