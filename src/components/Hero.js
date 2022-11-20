import { useRef, useEffect, useLayoutEffect, useContext } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import SplitType from "split-type";
import { useIsomorphicLayoutEffect } from "../hooks/useIsoEffect";
import { LoaderContext } from "../../pages/_app";
import { urlFor } from "../../sanity.js";

function Hero({ title, subTitle, heroImage }) {
  const component = useRef(null);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  let tl = gsap.timeline({ paused: true });
  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.to("#hero-image-overlay", {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 0.9,
      })
        .to(
          "#hero-image",
          {
            scale: 1.4,
            ease: "power2.inOut",
            duration: 0.9,
          },
          "<"
        )
        .from(
          "#hero-title, #sub-title",
          {
            yPercent: -120,
            duration: 1.4,
            ease: "power3.inOut",
          },
          "<0.2"
        );

      // gsap.to(".sub-title-container", {
      //   yPercent: -150,
      //   scrollTrigger: {
      //     trigger: component.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: 1,
      //   },
      // });

      // gsap.to(".sub-title-container, .hero-title-container", {
      //   yPercent: -150,
      //   scrollTrigger: {
      //     trigger: component.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: 1,
      //   },
      // });

      gsap.to("#hero-image", {
        yPercent: 35,
        scrollTrigger: {
          trigger: component.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, component);

    if (isLoading) {
      tl.pause();
    } else {
      tl.play();
    }

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      className="h-screen min-h-[500px]"
      id="hero-container"
      ref={component}
    >
      <div
        className="relative flex items-center justify-center h-full"
        id="hero-container"
      >
        <h1 className="absolute text-heroName font-bold uppercase top-[23%] font-neuehaas overflow-hidden hero-title-container z-[2]">
          <span className="inline-block" id="hero-title">
            {title}
          </span>
        </h1>
        <div className="absolute bottom-[23%] font-bold uppercase font-neuhaas text-heroSub flex tracking-wide overflow-hidden sub-title-container z-[2]">
          <span className="inline-block" id="sub-title">
            <span className="inline-block mr-3 italic font-thin font-gambetta">
              {subTitle.first_word}
            </span>
            {subTitle.second_word}
          </span>
        </div>
        <div
          className="relative w-[40%] aspect-[9/16] overflow-hidden bg-gray-500"
          id="hero-image-container"
        >
          <Image
            src={urlFor(heroImage).url()}
            alt="Alt text for the picture"
            fill
            className="object-cover scale-[1.6]"
            id="hero-image"
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-main-bg"
            id="hero-image-overlay"
          ></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
