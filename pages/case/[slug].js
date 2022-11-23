import { useEffect, useRef } from "react";
import Image from "next/image";
import { sanityClient } from "../../sanity";
import { motion } from "framer-motion";
import { urlFor } from "../../sanity";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../../src/hooks/useIsoEffect";
import { useContext } from "react";
import { FlipContext } from "../../pages/_app";
import { Flip } from "gsap/dist/Flip";
gsap.registerPlugin(Flip);

function Project({ project }) {
  const component = useRef();
  const { flipState, setFlipState } = useContext(FlipContext);
  // useIsomorphicLayoutEffect(() => {
  //   if (!flipState) return;
  //   console.log(flipState);
  //   const flip = Flip.from(flipState, {
  //     duration: 0.6,
  //     // fade: true,
  //     scale: true,
  //     absolute: true,
  //     ease: "power4.inOut",
  //     targets: projImageRef.current,
  //   });

  //   return () => {
  //     flip.kill();
  //   };
  // }, [flipState]);
  useIsomorphicLayoutEffect(() => {
    if (!flipState) return;
    console.log(flipState);
    let ctx = gsap.context(() => {
      gsap.set("#main-project-image", {
        position: "relative",
        inset: "0",
        zIndex: "-1",
      });
      Flip.from(flipState, {
        targets: "#main-project-image",
        scale: true,
        // absolute: true,
        duration: 1.4,
        // delay: 0.5,
        ease: "power4.inOut",
      });
    }, component);

    console.log(flipState);

    return () => ctx.revert();
  }, [flipState]);
  return (
    <div ref={component} className="h-auto overflow-hidden">
      Project:
      <h3 className="font-medium text-step0">{project.title}</h3>
      <div
        className="fixed w-full aspect-video"
        id="main-project-image"
        data-flip-id={project._id}
      >
        <Image src={urlFor(project.mainImage).url()} alt="props" fill />
      </div>
    </div>
  );
}

export default Project;

export const getStaticPaths = async () => {
  const query = `*[_type == "projects"]{
    _id,
    slug {
      current
    },
  }`;

  const projects = await sanityClient.fetch(query);

  const paths = projects.map((project) => ({
    params: {
      slug: project.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "projects" && slug.current == $slug][0]`;

  const query2 = `*[_type == "projects" && slug.current != $slug]`;

  const project = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  const otherProjects = await sanityClient.fetch(query2, {
    slug: params?.slug,
  });

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      otherProjects,
    },
    revalidate: 60,
  };
};
