/* ###################################
   GSAP — HORIZONTALE ABOUT SLIDER
################################### */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initAboutSlider() {
  const slider = document.getElementById("aboutSlider");
  const slides = gsap.utils.toArray(".about-slide");
  const totalSlides = slides.length;
  let currentSlide = 0;
  let isAnimating = false;
  const animated = new Set();

  /* ### Slide 0 animeren bij load ### */
  gsap.delayedCall(0.2, () => {
    animateSlideIn(slides[0], 0);
    updateSliderHeight(0);
  });

  window.addEventListener("resize", () => {
    gsap.set(slider, { x: -(currentSlide * window.innerWidth) });
    updateSliderHeight(currentSlide);
  });

  /* ### Update dots ### */
  function updateDots(index) {
    document.querySelectorAll(".slide-dot").forEach((dot) => {
      dot.classList.toggle("active", parseInt(dot.dataset.slide) === index);
    });
  }

  /* ### Eenmalig de inhoud van een slide animeren ### */
  function animateSlideIn(slideEl, index) {
    if (animated.has(index)) return;
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
      }
    );
  }

  function updateSliderHeight(index) {
    const activeSlide = slides[index];
    gsap.set(slider, { height: activeSlide.offsetHeight });
    ScrollTrigger.refresh();
  }

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
        updateSliderHeight(index);
        const label = slides[index].querySelector(".slide-inner");
        if (label) {
          label.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        animateSlideIn(slides[index], index);
      },
    });
  }

  /* ### Knoppen ### */
  document
    .querySelectorAll(".slide-next")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        goToSlide(parseInt(btn.dataset.target))
      )
    );
  document
    .querySelectorAll(".slide-prev")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        goToSlide(parseInt(btn.dataset.target))
      )
    );
  document
    .querySelectorAll(".slide-dot")
    .forEach((dot) =>
      dot.addEventListener("click", () =>
        goToSlide(parseInt(dot.dataset.slide))
      )
    );

  /* ### Swipe ### */
  let touchStartX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
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
}
