import React from "react";
import { urlFor } from "../../../sanity";
import { gsap } from "gsap/dist/gsap";
import { useRef } from "react";
import styled from "styled-components";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsoEffect";
import Image from "next/image";

function ProjectBody({ project }) {
  const component = useRef();
  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".parallax-img", {
        yPercent: 30,
        scrollTrigger: {
          trigger: ".parallax-img",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);
  return (
    <section
      className="mt-[8vmin] mb-[25vmin] px-2 md:max-w-[1200px] md:mx-auto"
      ref={component}
    >
      <ul className="flex flex-wrap gap-2 xl:my-24" id="project-tags">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="px-4 font-normal tracking-tight border rounded-full text-step2 md:text-step4 w-fit"
          >
            <h4>{tag}</h4>
          </li>
        ))}
      </ul>

      <article className="flex flex-col mt-20 md:grid md:grid-cols-2">
        <h2 className="mb-4 font-semibold leading-tight tracking-tight text-step2 md:text-step3">
          Overview
        </h2>
        <p className=" font-extralight text-step5 md:text-step6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere
          condimentum eleifend. Donec ligula nisl, congue vel tellus commodo,
          cursus sollicitudin arcu. Donec ligula elit, lobortis in dolor ac,
          fringilla rutrum orci. Maecenas ornare scelerisque congue. Aliquam
          feugiat, est at imperdiet posuere, risus enim aliquam libero, varius
          dapibus dui nibh in neque
        </p>
      </article>

      <hr className="mx-2 my-14 xl:my-32" />

      <article className="grid items-start grid-cols-2 mb-20 md:grid-cols-4 gap-y-8 xl:mb-44">
        <div>
          <h3 className="mb-1 font-semibold leading-tight tracking-tight md:mb-4 text-step3 md:text-step4">
            Client
          </h3>
          <p className="font-extralight text-step5 md:text-step6">
            {project.client}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold leading-tight tracking-tight md:mb-4 text-step3 md:text-step4">
            Year
          </h3>
          <p className="font-extralight text-step5 md:text-step6">
            {project.year}
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold leading-tight tracking-tight md:mb-4 text-step3 md:text-step4">
            Tools
          </h3>
          <div className="flex flex-col font-extralight text-step5 md:text-step6">
            {project.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
        <div>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block col-span-2 px-4 py-2 font-medium rounded-full xl:py-4 xl:px-8 bg-rg-white w-fit text-main-bg"
          >
            View Live Site
          </a>
        </div>
      </article>

      <div className="gap-2 md:grid md:grid-cols-2 md:grid-rows-2">
        <figure className="relative w-full h-full overflow-hidden rounded-lg aspect-video md:row-span-2">
          <Image
            src={urlFor(project.mainImage).url()}
            alt="props"
            fill
            className="object-cover parallax-img scale-[1.5]"
          />
        </figure>
        <figure className="relative w-full h-full overflow-hidden rounded-lg aspect-video">
          <Image
            src={urlFor(project.galleryFullWidthDesktop).url()}
            alt="props"
            fill
            className="object-cover parallax-img scale-[1.5]"
          />
        </figure>
        <figure className="relative w-full h-full overflow-hidden rounded-lg aspect-video">
          <Image
            src={urlFor(project.galleryFullWidthMobile).url()}
            alt="props"
            fill
            className="object-cover parallax-img scale-[1.5]"
          />
        </figure>
      </div>
    </section>
  );
}

export default ProjectBody;

const Grid = styled.div``;
