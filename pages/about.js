import Image from "next/image";
import React from "react";
import { BsInstagram, BsGithub, BsSpotify } from "react-icons/bs";
import { sanityClient } from "../sanity";
import { urlFor } from "../sanity";
import { motion } from "framer-motion";
import Head from "next/head";

function About({ siteSettings }) {
  const { aboutImage } = siteSettings;
  return (
    <motion.main
      className="flex items-center justify-center w-full md:max-w-[65rem] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Head>
        <title>Ryan Gabrinao - About</title>
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
      <section className="relative px-2 mt-[81.3px] py-20">
        <h1 className="mb-8 font-bold leading-none text-step_3 font-migra lg:text-step_5 whitespace-nowrap lg:absolute lg:opacity-[0.15] lg:top-[5%] lg:-left-[5rem] xl:-left-[25%] xl:-z-[5]">
          Hi, I&apos;m Ryan
        </h1>
        <div className="absolute w-[40%] aspect-[9/16] right-6 top-0 bottom-0 m-auto -z-[1] brightness-50 overflow-hidden">
          <Image
            src={urlFor(aboutImage).url()}
            fill
            className="object-cover object-bottom scale-125"
            alt="prop"
          />
        </div>

        <p className="font-medium leading-[1.2] tracking-tight text-step1 lg:text-step1">
          I&apos;m a developer / designer based in{" "}
          <span className="from-[#3CA55C] to-[#B5AC49] bg-gradient-to-r bg-clip-text text-transparent">
            Vancouver, B.C.
          </span>{" "}
          I specialize in creating interactive experiences and user-friendly
          interfaces whilst maintaining semantic, clean markup, and SEO friendly
          code.
        </p>
        <p className="font-medium leading-[1.2] tracking-tight text-step1 1 mt-[3rem] lg:text-step1">
          When I&apos;m not designing, you can find me experimenting with
          fashion, writing about my various thoughts, cooking for family and
          friends, playing football or basketball, or creating a new Spotify
          playlist.
        </p>
        <a
          href="/files/resume.pdf"
          alt="alt text"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-2 my-10 uppercase border rounded-full border-rg-white">
            Download Resume
          </button>
        </a>
        <p className="mt-8 mb-4 tracking-tight opacity-60 text-step3 xl:text-step6">
          Go check my socials!
        </p>
        <div className="flex gap-4 xl:gap-8">
          <a
            href="https://github.com/RyanGabrinao"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="w-10 h-10 fill-orange-300" />
          </a>
          <a
            href="https://www.instagram.com/studiopremo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram className="w-10 h-10 fill-orange-300" />
          </a>
          <a
            href="https://open.spotify.com/user/12159165681?si=51d58aab89894528"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsSpotify className="w-10 h-10 fill-orange-300" />
          </a>
        </div>
      </section>
    </motion.main>
  );
}

export default About;

export const getStaticProps = async () => {
  const query2 = `*[_type == "siteSettings"][0]`;
  const siteSettings = await sanityClient.fetch(query2);

  if (!siteSettings) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      siteSettings,
    },
  };
};
