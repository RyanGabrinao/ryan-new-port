import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../sanity";
import { gsap } from "gsap/dist/gsap";
import { useIsomorphicLayoutEffect } from "../hooks/useIsoEffect";
import { Flip } from "gsap/dist/Flip";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { CSSTransition } from "react-transition-group";

function Works({ projects, setFlipState }) {
  const component = useRef();

  useEffect(() => {
    const state = Flip.getState(`.project-image`);
    setFlipState(state);
  }, [setFlipState]);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".interactable", {
        yPercent: 110,
        opacity: 0,
        pointerEvents: "none",
        duration: 1.1,
        ease: "power4.out",
        stagger: { each: 0.2 },
        scrollTrigger: {
          trigger: ".interactable",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".works-title", {
        opacity: 0,
        yPercent: 100,
        duration: 1.1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: component.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={component}
      className="mb-[30vmax] relative z-10 flex flex-col items-center"
      id="works-section"
    >
      <h2 className="font-bold md:text-step_2 tracking-tight text-step_4 works-title mb-[0.5em] xl:text-step_1">
        Projects
      </h2>

      {projects.map((project) => {
        return (
          <div key={project._id} className="block mb-[2rem]">
            <Project
              {...project}
              path={`/case/${project.slug.current}`}
              src={urlFor(project.mainImage).url()}
              setFlipState={setFlipState}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Works;

const Project = ({ _id, title, path, src }) => {
  const [isHovered, setIsHovered] = useState();

  const handleOnEnter = () => {
    setIsHovered(true);
  };
  const handleOnLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Link href={path} className="block w-fit">
        <div
          className={`relative inline-block overflow-hidden interactable ${
            isHovered && "z-10"
          }`}
          onMouseEnter={handleOnEnter}
          onMouseLeave={handleOnLeave}
        >
          <div>
            <h3 className="font-medium text-step0 project-title">{title}</h3>
            <h3
              className={`absolute top-0 font-medium text-step0 title-clone ${
                isHovered && "clone-appear"
              }`}
              aria-hidden="true"
            >
              {title}
            </h3>
          </div>
        </div>
      </Link>
      <div
        className={`pointer-events-none project-image image-${_id} overflow-hidden w-[30%] mx-auto aspect-square fixed transition-all duration-200 fixed-center ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isHovered ? "opacity-1 z-[9]" : "opacity-0"
        }`}
        data-flip-id={_id}
      >
        <Image src={src} alt="props" fill className="object-cover" />
      </div>
      <div
        className={`fixed w-full h-screen top-0 left-0 pointer-events-none z-[8] transition-opacity duration-200 bg-main-bg ${
          isHovered ? "opacity-[0.82]" : "opacity-0"
        }`}
      ></div>
    </>
  );
};
