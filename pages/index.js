import { useRef } from "react";
import Head from "next/head";
import Hero from "../src/components/Hero";
import { sanityClient } from "../sanity";
import Works from "../src/components/Works";
import { gsap } from "gsap/dist/gsap";
import { useIsomorphicLayoutEffect } from "../src/hooks/useIsoEffect";
import Create from "../src/components/Create";

export default function Home({
  siteSettings,
  projects,
  setFlipState,
  isLoading,
  isTransitioning,
  setIsTransitioning,
}) {
  const mainComponent = useRef();
  useIsomorphicLayoutEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#create-section",
        start: "top=+100px top",
      },
    });

    tl.to("body", {
      backgroundColor: "#FF884B",
    });

    return () => tl.revert();
  }, []);

  return (
    <main className="flex flex-col" ref={mainComponent}>
      <Head>
        <title>Ryan Gabrinao - Front-End Developer</title>
        <meta
          name="description"
          content="Ryan Gabrinao. I am a graduate of BCIT's Front-End Web Developer program which gave me a broad overview of the current web technologies being used today."
        />
        <meta
          name="keyword"
          content="portfolio, javascript, react, typescript, ryan, gabrinao, freelance, bcit, ryangabrinao, front end developer, creative, developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero {...siteSettings} isLoading={isLoading} />
      <Works
        projects={projects}
        setFlipState={setFlipState}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
      />
      <Create />
    </main>
  );
}

export const getStaticProps = async () => {
  const query = `*[_type == "projects"]`;
  const projects = await sanityClient.fetch(query);

  const query2 = `*[_type == "siteSettings"][0]`;
  const siteSettings = await sanityClient.fetch(query2);

  if (!projects || !siteSettings) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projects,
      siteSettings,
    },
  };
};
