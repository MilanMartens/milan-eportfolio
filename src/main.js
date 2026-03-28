import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initNav } from "./nav.js";
import { initSkills, checkMobileFilter } from "./skills.js";
import { initAboutSlider } from "./aboutSlider.js";
import { initAnimations } from "./animations.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSkills();
  checkMobileFilter();
  initAboutSlider();
  initAnimations();

  window.addEventListener("resize", checkMobileFilter);
});
