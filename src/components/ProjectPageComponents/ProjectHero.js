import React from "react";
import Image from "next/image";
import { gsap } from "gsap/dist/gsap";
import { useRef } from "react";
import { urlFor } from "../../../sanity";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsoEffect";
import SplitType from "split-type";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(Flip);

function ProjectHero({ project, flipState }) {
  const component = useRef();
  useIsomorphicLayoutEffect(() => {
    let text = SplitType.create("[text-split]", {
      types: "words, chars, lines",
      tagName: "span",
    });
    if (!flipState) return;
    let ctx = gsap.context(() => {
      let titletl = gsap.timeline({ paused: true });
      titletl.from("#project-title .word", {
        yPercent: -110,
        ease: "power2.inOut",
        duration: 0.7,
        stagger: { amount: 0.15 },
      });

      Flip.from(flipState, {
        targets: "#main-project-image-container",
        // scale: true,
        duration: 1.4,
        // absolute: true,
        ease: "expo.inOut",
        onComplete: () => titletl.play(),
      });
    }, component);

    return () => ctx.revert();
  }, [flipState]);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".project-hero-image", {
        scale: 1.2,
        scrollTrigger: {
          trigger: component.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="project-hero-section"
      className="relative flex flex-col justify-end h-[100vh] lg:h-[120vh] xl:h-[175vh] lg:max-h-[120em] gap-[5vmin] md:gap-[2vmin] whitespace-normal overflow-hidden"
      ref={component}
    >
      <h1
        className="tracking-tight font-semibold leading-[0.8] text-step_2"
        id="project-title"
        text-split=""
      >
        {project.title}
      </h1>
      <div
        className="relative w-full overflow-hidden aspect-video"
        id="main-project-image-container"
        data-flip-id={project._id}
      >
        <Image
          src={urlFor(project.mainImage).url()}
          alt="props"
          fill
          className="object-cover project-hero-image"
        />
      </div>
    </section>
  );
}

export default ProjectHero;
