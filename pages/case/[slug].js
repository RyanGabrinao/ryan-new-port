import { useRef } from "react";
import Image from "next/image";
import { sanityClient } from "../../sanity";
import { motion } from "framer-motion";
import { urlFor } from "../../sanity";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../../src/hooks/useIsoEffect";

function Project({ project }) {
  const component = useRef();
  // useIsomorphicLayoutEffect(() => {
  //   let ctx = gsap.context(() => {

  //   }, component);
  // }, []);
  return (
    <div ref={component} className="h-[200vh]">
      Project:
      <h3 className="font-medium text-step0">{project.title}</h3>
      <div className="absolute aspect-video" id="main-project-image">
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
