import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const createScrollTrigger = (triggerEl, timeline) => {
  ScrollTrigger.create({
    trigger: triggerEl,
    start: "top bottom",
    onLeaveBack: () => {
      timeline.progress(0);
      timeline.pause();
    },
  });

  ScrollTrigger.create({
    trigger: triggerEl,
    start: "top 75%",
    onEnter: () => timeline.play(),
  });
};
