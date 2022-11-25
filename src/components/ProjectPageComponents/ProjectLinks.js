import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { Flip } from "gsap/dist/Flip";
import { urlFor } from "../../../sanity";

function ProjectLinks({ projects, setFlipState }) {
  return (
    <section className="h-[250vh] w-full mt-40 relative">
      <h2 className="font-bold leading-none tracking-tight text-step_3">
        Other Projects
      </h2>
      <OtherProjects projects={projects} setFlipState={setFlipState} />
    </section>
  );
}

export default ProjectLinks;

const OtherProjects = ({ projects, setFlipState }) => {
  return (
    <div>
      {projects.map((project) => (
        <OtherProjectItem
          key={project._id}
          project={project}
          setFlipState={setFlipState}
        />
      ))}
    </div>
  );
};

const OtherProjectItem = ({ project, setFlipState }) => {
  const component = useRef();
  const handleClick = () => {
    const state = Flip.getState(`.project-image`);
    setFlipState(state);
  };
  return (
    <div ref={component}>
      <Link href={`/case/${project.slug.current}`} onClick={handleClick}>
        <h2>{project.title}</h2>
      </Link>
      <div
        className="relative w-36 aspect-square project-image"
        data-flip-id={project._id}
      >
        <Image
          src={urlFor(project.mainImage).url()}
          alt="props"
          fill
          className={`object-cover image-${project._id}`}
        />
      </div>
    </div>
  );
};
