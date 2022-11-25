import React from "react";
import { urlFor } from "../../../sanity";
import { gsap } from "gsap/dist/gsap";
import { useRef } from "react";
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
    <section className="mt-[8vmin]" ref={component}>
      <ul className="flex flex-wrap gap-2" id="project-tags">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="px-4 font-normal tracking-tight border rounded-full text-step2 w-fit"
          >
            <h4>{tag}</h4>
          </li>
        ))}
      </ul>
      <article className="flex flex-col px-2 mt-20">
        <h2 className="mb-4 font-semibold leading-tight text-step2">
          Introduction
        </h2>
        <p className="tracking-wider font-extralight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere
          condimentum eleifend. Donec ligula nisl, congue vel tellus commodo,
          cursus sollicitudin arcu. Donec ligula elit, lobortis in dolor ac,
          fringilla rutrum orci. Maecenas ornare scelerisque congue. Aliquam
          feugiat, est at imperdiet posuere, risus enim aliquam libero, varius
          dapibus dui nibh in neque
        </p>
      </article>
      <hr className="mx-2 my-14" />
      <article className="grid grid-cols-2 px-2 mb-20 gap-y-8">
        <div>
          <h3 className="font-medium leading-tight text-step3">Client</h3>
          <p className="font-extralight">Sample Client</p>
        </div>
        <div>
          <h3 className="font-medium leading-tight text-step3">Year</h3>
          <p className="font-extralight">Sample Client</p>
        </div>
        <div>
          <h3 className="font-medium leading-tight text-step3">Tools</h3>
          <p className="font-extralight">Sample Client</p>
        </div>
        <a
          href=""
          className="col-span-2 px-4 py-2 font-medium rounded-full bg-rg-white w-fit text-main-bg"
        >
          View Live Site
        </a>
      </article>
      <figure className="relative w-full overflow-hidden aspect-video">
        <Image
          src={urlFor(project.mainImage).url()}
          alt="props"
          fill
          className="object-cover scale-150 parallax-img"
        />
      </figure>
    </section>
  );
}

export default ProjectBody;
