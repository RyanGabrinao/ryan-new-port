import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../sanity";

function Works({ projects }) {
  return (
    <section>
      <h2>Come check out my projects</h2>
      {projects.map((project) => {
        return (
          <div key={project._id}>
            <h1>{project.title}</h1>
            <div className="overflow-hidden rounded-xl w-[80%] mx-auto aspect-video relative">
              <Link href={`/case/${project.slug.current}`}>
                <Image src={urlFor(project.mainImage).url()} alt="props" fill />
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Works;
