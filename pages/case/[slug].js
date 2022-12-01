import { sanityClient } from "../../sanity";
import ProjectHero from "../../src/components/ProjectPageComponents/ProjectHero";
import ProjectBody from "../../src/components/ProjectPageComponents/ProjectBody";
import ProjectLinks from "../../src/components/ProjectPageComponents/ProjectLinks";
import { AnimatePresence, motion } from "framer-motion";

function Project({
  project,
  otherProjects,
  flipState,
  setFlipState,
  isTransitioning,
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
  };
};
