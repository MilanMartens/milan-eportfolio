import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// animation.
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".doos");

ScrollTrigger.defaults({
  markers: true,
});

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-slider",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".horizontal-slider").offsetWidth,
  },
});
