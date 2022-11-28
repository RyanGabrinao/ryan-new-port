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
import PageTransition from "../../src/components/PageTransition";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

function Project({
  project,
  otherProjects,
  flipState,
  setFlipState,
  isTransitioning,
  setIsTransitioning,
}) {
  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.main
          key={project._id}
          initial={{ opacity: !flipState ? 0 : 1 }}
          animate={{ opacity: 1 }}
          className="overflow-x-hidden"
          exit={{ opacity: 0 }}
        >
          <ProjectHero project={project} flipState={flipState} />
          <ProjectBody project={project} />
          <ProjectLinks projects={otherProjects} setFlipState={setFlipState} />
        </motion.main>
      )}
    </AnimatePresence>
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
