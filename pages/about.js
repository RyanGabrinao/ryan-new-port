import React from "react";
import { BsInstagram, BsGithub, BsSpotify } from "react-icons/bs";

function About() {
  return (
    <main className="flex items-center justify-center w-full h-screen md:max-w-[85rem] mx-auto">
      <section className="px-2">
        <h1 className="font-bold tracking-tight text-heroName xl:text-step_1">
          This page is currently under construction...
        </h1>
        <p className="mb-4 tracking-tight opacity-60 text-step3 xl:text-step5">
          In the meantime, go check my socials!
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
    </main>
  );
}

export default About;
