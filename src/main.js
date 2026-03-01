/* ###################################
   NAVIGATIE
################################### */
const toggle = document.getElementById("navToggle");
const panel = document.getElementById("navPanel");
const closeBtn = document.getElementById("navClose");

toggle.addEventListener("click", () => panel.classList.add("open"));

closeBtn.addEventListener("click", () => {
  panel.classList.remove("open");
  toggle.classList.remove("hidden");
});

toggle.addEventListener("click", () => {
  const isOpen = panel.classList.contains("open");
  toggle.classList.toggle("hidden", isOpen);
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

/* ###################################
   GSAP — HORIZONTALE ABOUT SLIDER
################################### */
gsap.registerPlugin(ScrollTrigger);

const slider = document.getElementById("aboutSlider");
const slides = gsap.utils.toArray(".about-slide");
const totalSlides = slides.length;
let currentSlide = 0;
let isAnimating = false;

// Bijhouden welke slides al geanimeerd zijn
const animated = new Set();

/* ### Update dots ### */
function updateDots(index) {
  document.querySelectorAll(".slide-dot").forEach((dot) => {
    dot.classList.toggle("active", parseInt(dot.dataset.slide) === index);
  });
}

/* ### Eenmalig de inhoud van een slide animeren ### */
function animateSlideIn(slideEl, index) {
  if (animated.has(index)) return; // al geanimeerd → niets doen
  animated.add(index);

  gsap.fromTo(
    slideEl.querySelectorAll(".gsap-fade"),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "transform",
    },
  );
}

/* ### Naar een slide navigeren ### */
function goToSlide(index) {
  if (isAnimating) return;
  index = Math.max(0, Math.min(index, totalSlides - 1));
  if (index === currentSlide) return;

  isAnimating = true;
  currentSlide = index;
  updateDots(index);

  gsap.to(slider, {
    x: -(index * window.innerWidth),
    duration: 0.85,
    ease: "expo.inOut",
    onComplete: () => {
      isAnimating = false;
      animateSlideIn(slides[index], index);
    },
  });
}

/* ### Slide 0 animeren bij load ### */
gsap.delayedCall(0.2, () => animateSlideIn(slides[0], 0));

/* ### Knoppen ### */
document
  .querySelectorAll(".slide-next")
  .forEach((btn) =>
    btn.addEventListener("click", () =>
      goToSlide(parseInt(btn.dataset.target)),
    ),
  );
document
  .querySelectorAll(".slide-prev")
  .forEach((btn) =>
    btn.addEventListener("click", () =>
      goToSlide(parseInt(btn.dataset.target)),
    ),
  );
document
  .querySelectorAll(".slide-dot")
  .forEach((dot) =>
    dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.slide))),
  );

/* ### Swipe ### */
let touchStartX = 0;
slider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);
slider.addEventListener("touchend", (e) => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 60) goToSlide(currentSlide + (delta > 0 ? 1 : -1));
});

/* ### Pijltjestoetsen ### */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
  if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
});

/* ### Resize ### */
window.addEventListener("resize", () => {
  gsap.set(slider, { x: -(currentSlide * window.innerWidth) });
});

/* ###################################
   GSAP — PAGINA ANIMATIES
################################### */

/* ### Hero ### */
gsap.from(
  [
    ".hero-logo",
    ".hero-name",
    ".hero-sub",
    ".hero-section .flex.justify-center",
  ],
  {
    opacity: 0,
    y: 20,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
    delay: 0.2,
  },
);

/* ### Project cards bij scrollen ### */
gsap.utils.toArray(".project-card").forEach((card) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: card, start: "top 88%", once: true },
  });
});
