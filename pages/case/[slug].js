import { useState, useRef } from "react";
import Image from "next/image";
import { sanityClient } from "../../sanity";
import { urlFor } from "../../sanity";
import { useContext } from "react";
import { FlipContext } from "../../pages/_app";
import { Flip } from "gsap/dist/Flip";
import { Desktop, Mobile } from "../../utils/mediaQueries";
import Link from "next/link";
import ProjectHero from "../../src/components/ProjectPageComponents/ProjectHero";
import ProjectBody from "../../src/components/ProjectPageComponents/ProjectBody";
import ProjectLinks from "../../src/components/ProjectPageComponents/ProjectLinks";

function Project({ project, otherProjects }) {
  const component = useRef();
  const { flipState, setFlipState } = useContext(FlipContext);

  return (
    <main ref={component} className="overflow-x-hidden">
      <ProjectHero project={project} flipState={flipState} />
      <ProjectBody project={project} />
      <ProjectLinks projects={otherProjects} setFlipState={setFlipState} />
    </main>
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
