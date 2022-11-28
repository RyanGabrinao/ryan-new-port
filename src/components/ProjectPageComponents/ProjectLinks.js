import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { Flip } from "gsap/dist/Flip";
import { urlFor } from "../../../sanity";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsoEffect";
import { useMediaQuery } from "react-responsive";

function ProjectLinks({ projects, setFlipState }) {
  return (
    <section className="relative w-full px-2 mt-40">
      <h2 className="font-bold leading-none tracking-tight mb-7 text-step2">
        Other Projects
      </h2>
      <OtherProjects projects={projects} setFlipState={setFlipState} />
    </section>
  );
}

export default ProjectLinks;

const OtherProjects = ({ projects, setFlipState }) => {
  return (
    <div className="flex flex-col gap-7">
      {projects.map((project, i) => (
        <OtherProjectItem
          key={project._id}
          project={project}
          setFlipState={setFlipState}
          i={++i}
        />
      ))}
    </div>
  );
};

const OtherProjectItem = ({ project, setFlipState, i }) => {
  const component = useRef();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  let tl = gsap.timeline({ paused: true });
  const hoverTween = useRef(null);
  const hoverTween2 = useRef(null);
  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        "(min-width: 800px)",
        () => {
          hoverTween.current = gsap.to("h2.real .char", {
            yPercent: -100,
            duration: 0.3,
            stagger: { amount: 0.2 },
            paused: true,
          });
          hoverTween2.current = gsap.fromTo(
            "h2.notreal .char",
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.3,
              stagger: { amount: 0.2 },
              paused: true,
            }
          );
        },
        component
      );
    }, component);
  }, []);

  const onMouseEnterHandler = () => {
    hoverTween.current.play();
    hoverTween2.current.play();
  };
  const onMouseLeaveHandler = () => {
    hoverTween.current.reverse();
    hoverTween2.current.reverse();
  };
  const handleClick = () => {
    if (isDesktop) {
      hoverTween.current.kill();
      hoverTween2.current.kill();
    }
    setFlipState(null);
  };

  return (
    <div
      ref={component}
      className="flex mt-[0.5em]"
      onMouseEnter={isDesktop ? onMouseEnterHandler : null}
      onMouseLeave={isDesktop ? onMouseLeaveHandler : null}
    >
      <span className="inline-block mr-4 opacity-40">{`/0${i}`}</span>
      <Link
        href={`/case/${project.slug.current}`}
        onClick={handleClick}
        className="relative inline-block text-step2"
      >
        <h2 className="font-medium leading-none uppercase real" text-split="">
          {project.title}
        </h2>
        <h2
          className="absolute top-0 left-0 invisible italic font-bold leading-none tracking-wide uppercase notreal lg:visible font-gambetta whitespace-nowrap"
          aria-hidden="true"
          text-split=""
        >
          {project.title}
        </h2>
      </Link>
    </div>
  );
};
