import { useState, useRef } from "react";
import Image from "next/image";
import { sanityClient } from "../../sanity";
import { motion } from "framer-motion";
import { urlFor } from "../../sanity";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../../src/hooks/useIsoEffect";
import { useContext } from "react";
import { FlipContext, LoaderContext } from "../../pages/_app";
import { Flip } from "gsap/dist/Flip";
import SplitType from "split-type";
import { useLayoutEffect } from "react";
gsap.registerPlugin(Flip);

function Project({ project }) {
  const component = useRef();
  const { flipState, setFlipState } = useContext(FlipContext);
  const { isLoading } = useContext(LoaderContext);
  let titletl = gsap.timeline({ paused: true });
  const playAnim = () => titletl.play();
  useIsomorphicLayoutEffect(() => {
    let text = SplitType.create("[text-split]", {
      types: "words, chars, lines",
      tagName: "span",
    });

    let ctx = gsap.context(() => {
      titletl
        .to("#project-title .word", { opacity: 1 })
        .from("#project-title .word", {
          yPercent: -110,
          ease: "power2.inOut",
          duration: 0.7,
          stagger: { amount: 0.15 },
        });
    }, component);

    if (!(flipState && isLoading)) titletl.play();

    return () => ctx.revert();
  }, [isLoading]);
  useIsomorphicLayoutEffect(() => {
    if (!flipState) return;
    let ctx = gsap.context(() => {
      Flip.from(flipState, {
        targets: "#main-project-image",
        scale: true,
        // absolute: true,
        duration: 1.4,
        ease: "power4.inOut",
        onComplete: playAnim,
      });
    }, component);

    return () => ctx.revert();
  }, [flipState]);
  return (
    <main ref={component} className="overflow-x-hidden">
      <section
        id="project-hero-section"
        className="relative flex flex-col justify-end h-[80vh] break-words whitespace-normal"
      >
        <h3
          className="font-semibold leading-[0.8] text-step_5"
          id="project-title"
          text-split=""
        >
          {project.title}
        </h3>
        <div
          className="relative w-full aspect-video"
          id="main-project-image"
          data-flip-id={project._id}
        >
          <Image src={urlFor(project.mainImage).url()} alt="props" fill />
        </div>
      </section>

      <p className="text-step4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        venenatis metus ut nulla sollicitudin laoreet. Duis lacinia est in lorem
        dictum cursus. Nunc a scelerisque quam, et malesuada turpis. Nunc porta
        velit at elementum vulputate. Proin augue ex, scelerisque vitae nisl at,
        dapibus aliquam urna. Maecenas id congue lacus. Suspendisse blandit,
        tortor ut iaculis aliquet, eros quam mollis sapien, in dignissim felis
        justo a eros. Nunc vestibulum ligula eget nulla tempor, non pellentesque
        ante vehicula. Nullam vehicula lorem neque, quis pharetra nunc rhoncus
        nec. Duis sollicitudin magna id ante vehicula suscipit quis sed mi.
        Aenean pellentesque augue eu metus dignissim accumsan. Morbi ac purus
        tincidunt, porttitor libero nec, efficitur mi. Maecenas nec cursus
        purus. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Praesent volutpat, libero et facilisis
        ultrices, quam ligula vestibulum eros, at varius ipsum risus vel velit.
        Vivamus mattis risus et sem maximus feugiat. Aliquam eget consequat
        mauris. Aenean sit amet sodales ante. Nunc dignissim felis at massa
        facilisis suscipit viverra vel odio. Fusce erat purus, scelerisque eu
        metus nec, iaculis blandit ante. Nulla vitae tellus imperdiet, blandit
        lacus mollis, consectetur lectus. Duis rutrum eros scelerisque enim
        aliquet fermentum. Aenean vel augue sed neque bibendum lobortis.
        Curabitur pellentesque, elit vel accumsan sollicitudin, enim arcu
        consequat odio, at vehicula purus neque at nulla. Pellentesque vel eros
        accumsan, consequat felis at, posuere sem. Praesent consectetur a eros
        eget ultricies. Fusce luctus lectus dui, efficitur dictum mauris aliquam
        porta. Pellentesque vitae magna ac felis pretium tincidunt. Ut vel felis
        vel lectus eleifend aliquet et tempor sem. Aenean quis mollis nibh.
        Integer nunc mauris, hendrerit at arcu dignissim, pulvinar pharetra
        nisl. Praesent metus eros, varius eget rutrum sit amet, consectetur eget
        nisi. Aliquam interdum, nisi ut faucibus blandit, tortor nunc lacinia
        nunc, nec ultricies turpis sapien nec mauris. Etiam imperdiet ipsum
        ultrices condimentum cursus. Pellentesque sed venenatis justo, nec
        congue quam. Pellentesque sollicitudin erat eget urna consequat, ut
        commodo erat mollis. Mauris molestie commodo lacinia. Fusce pharetra
        nulla ex. Cras nec magna id velit laoreet mattis nec vitae mauris. Duis
        sit amet sapien id sapien dapibus euismod tincidunt hendrerit tortor.
        Nulla finibus erat lacus, sit amet cursus nibh rhoncus non. Proin eu
        congue turpis, in lacinia erat. Suspendisse sed congue nisi.
      </p>
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
