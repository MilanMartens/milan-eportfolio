/* ###################################
   GSAP — PAGINA ANIMATIES
################################### */
import { gsap } from "gsap";

export function initAnimations() {
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
    }
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
}
