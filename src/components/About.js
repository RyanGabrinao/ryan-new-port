import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { createScrollTrigger } from "../utility/gsap";
import SplitType from "split-type";
import { useIsomorphicLayoutEffect } from "../hooks/useIsoEffect";

const About = () => {
  const component = useRef(null);
  useIsomorphicLayoutEffect(() => {
    let text = SplitType.create("[text-split]", {
      types: "words, chars",
      tagName: "span",
    });
    let allWithClass = Array.from(
      document.querySelectorAll("[letters-slide-down]")
    );

    let ctx = gsap.context(() => {
      allWithClass.map((el) => {
        let tl = gsap.timeline({ paused: true });
        tl.from(el.querySelectorAll(".char"), {
          yPercent: -120,
          duration: 0.5,
          ease: "power1.out",
          stagger: { amount: 0.4 },
        });
        createScrollTrigger(el, tl);
      });
    }, component);

    return () => {
      ctx.revert();
      text.revert();
    };
  }, []);

  return (
    <section
      className="relative flex flex-col gap-[80vh] leading-[1.1] mb-[60vmax] z-10"
      id="about-section"
      ref={component}
    >
      <p
        className="w-[70%] text-justify font-normal font-neuehaas text-step3 ml-[3vmin] relative z-10"
        text-split=""
        letters-slide-down=""
      >
        I am a freelancer who can cover the full cycle of a design project. i
        revise the current website, then analyze the niche and competitors in
        order to create an unusual, creative, and eye-catching design. i work
        with both large and small businesses with different goals.
      </p>
      <p
        className="w-[80%] ml-auto font-normal text-justify font-neuehaas text-step3 mr-[3vmin] relative z-10"
        text-split=""
        letters-slide-down=""
      >
        I develop websites at a top-notch level, stylish and modern animation,
        fast loading speed, high-quality mobile adaptation are my main
        priorities.
      </p>
    </section>
  );
};

export default About;
