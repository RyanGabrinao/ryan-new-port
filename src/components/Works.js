import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../sanity";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../hooks/useIsoEffect";
import { createScrollTrigger } from "../utility/gsap";
import SplitType from "split-type";

function Works({ projects }) {
  const component = useRef();

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".interactable", {
        yPercent: 110,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.7,
        ease: "power4.out",
        stagger: { each: 0.2 },
        scrollTrigger: {
          trigger: ".interactable",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
      let tl = gsap.timeline();
    }, component);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={component} className="h-[100vh]" id="works-section">
      {/* <h2 className="text-step0 font-migra">Come check out my projects</h2> */}
      {projects.map((project) => {
        return (
          <div key={project._id} className="block mb-[2rem]">
            <Project
              {...project}
              path={`/case/${project.slug.current}`}
              src={urlFor(project.mainImage).url()}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Works;

const Project = ({ title, path, src }) => {
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
            <h3 className="font-medium text-red-700 text-step_1 project-title">
              {title}
            </h3>
            <h3
              className={`absolute top-0 font-medium text-step_1 title-clone ${
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
        className={`pointer-events-none project-image overflow-hidden rounded-xl w-[80%] mx-auto aspect-video fixed transition-all duration-200 fixed-center ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isHovered ? "opacity-1 z-[9]" : "opacity-0"
        }`}
      >
        <Image src={src} alt="props" fill />
      </div>
      <div
        className={`fixed w-full h-screen top-0 left-0 pointer-events-none z-[8] transition-opacity duration-200 bg-main-bg ${
          isHovered ? "opacity-[0.82]" : "opacity-0"
        }`}
      ></div>
    </>
  );
};
