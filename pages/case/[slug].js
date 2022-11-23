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
    <main ref={component} className="h-auto">
      <section id="project-hero-section"></section>
      <h3 className="font-medium text-step0">{project.title}</h3>
      <div
        className="fixed w-full aspect-video"
        id="main-project-image"
        data-flip-id={project._id}
      >
        <Image src={urlFor(project.mainImage).url()} alt="props" fill />
      </div>
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
