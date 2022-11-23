import { useRef, useContext } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useIsomorphicLayoutEffect } from "../hooks/useIsoEffect";
import { LoaderContext } from "../../pages/_app";
import { urlFor } from "../../sanity.js";
import Marquee from "react-fast-marquee";

function Hero({
  title,
  subTitle,
  heroImage,
  heroImage2,
  currentlyListening,
  currentlyWatching,
}) {
  const component = useRef(null);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  let tl = gsap.timeline({ paused: true });

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".currently-title", { autoAlpha: 1 });
      tl.to(".hero-image-overlay", {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 0.7,
      })
        .to(
          ".hero-image",
          {
            scale: 1.6,
            ease: "power2.inOut",
            duration: 0.7,
          },
          "<"
        )
        .from(
          "#hero-title, #sub-title, .currently-title",
          {
            yPercent: -120,
            duration: 0.9,
            ease: "power3.inOut",
          },
          "<0.2"
        )
        .from(
          ".truncate",
          {
            yPercent: -120,
            duration: 0.8,
            ease: "none",
            stagger: { amount: 0.3 },
          },
          "<"
        );

      gsap.to("#hero-container", {
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero-container",
          start: "80% top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-image", {
        yPercent: 15,
        scrollTrigger: {
          trigger: component.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (isLoading) {
        tl.pause();
        console.log("pause anim");
      } else {
        tl.play();
        console.log("play anim");
      }
    }, component);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      className="h-screen min-h-[500px] mb-[40vmax] overflow-hidden z-10"
      id="hero-container"
      ref={component}
    >
      <div className="relative h-full pt-[5rem]" id="hero-container">
        <HeroImage
          src={urlFor(heroImage).url()}
          containerCn="relative w-[45%] aspect-[3/4] overflow-hidden hero-image-container"
        />
        <HeroImage
          src={urlFor(heroImage2).url()}
          containerCn="absolute bottom-[5%] right-0 w-[40%] aspect-[3/5] overflow-hidden hero-image-container"
        />
        <HeroTitle title={title} subTitle={subTitle} />
        <CurrentlyWatching isLoading={isLoading} data={currentlyWatching} />
        <CurrentlyListening isLoading={isLoading} data={currentlyListening} />
      </div>
    </section>
  );
}

export default Hero;

const ImageOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-main-bg hero-image-overlay"></div>
  );
};

const HeroTitle = ({ title, subTitle }) => {
  return (
    <div className="absolute top-[50%] -translate-y-1/2">
      <h1 className="overflow-hidden font-bold leading-[0.77] uppercase text-step_3 font-neuehaas hero-title-container tracking-tight">
        <span className="inline-block overflow-hidden" id="hero-title">
          {title}
        </span>
      </h1>
      <h2 className="ml-[1.8rem] overflow-hidden leading-[1] font-bold uppercase font-neuhaas text-heroSub sub-title-container tracking-tighter">
        <span className="inline-block" id="sub-title">
          <span className="inline-block mr-3 italic font-thin font-gambetta">
            {subTitle.first_word}
          </span>
          {subTitle.second_word}
        </span>
      </h2>
    </div>
  );
};

const HeroImage = ({ src, containerCn }) => {
  return (
    <div className={containerCn}>
      <Image
        src={src}
        alt="Alt text for the picture"
        fill
        className="object-cover scale-[2] hero-image"
      />
      <ImageOverlay />
    </div>
  );
};

const CurrentlyWatching = ({ isLoading, data }) => {
  const listCurrentlyWatching = data?.map((video, i) => {
    return (
      <li
        key={video._key}
        className="ml-auto overflow-hidden font-thin tracking-wide truncate w-fit font-neuehaas hover:text-orange-400 text-step6"
      >
        <a
          href={video.Link}
          target="_blank"
          rel="noreferrer"
          className="inline-block w-[100%] truncate"
        >
          {++i + ". " + video.name}
        </a>
      </li>
    );
  });
  return (
    <div
      className="absolute top-[10%] right-1 max-w-[50%] text-right overflow-hidden"
      id="currently-container-1"
    >
      <Marquee gradient={false} speed={30} direction="right">
        <h4
          className={`font-bold tracking-widest uppercase font-gambetta text-step4 leading-[1.1] mb-[0.6em] currently-title ${
            isLoading ? "opacity-0" : ""
          }`}
        >
          Currently Viewing
        </h4>
      </Marquee>
      <ol>{listCurrentlyWatching}</ol>
    </div>
  );
};

const CurrentlyListening = ({ isLoading, data }) => {
  const listCurrentlyListening = data?.map((song, i) => {
    return (
      <li
        key={song._key}
        className="overflow-hidden font-thin tracking-wide w-fit font-neuehaas hover:text-purple-400 text-step6"
      >
        <a
          href={song.Link}
          target="_blank"
          rel="noreferrer"
          className="inline-block w-[100%] truncate"
        >
          {++i + ". " + song.name}
        </a>
      </li>
    );
  });
  return (
    <div
      className="absolute bottom-[5%] left-1 max-w-[50%]"
      id="currently-container-2"
    >
      <Marquee gradient={false} speed={30}>
        <h4
          className={`font-bold tracking-widest uppercase font-gambetta text-step4 leading-[1.1] mb-[0.6em] currently-title ${
            isLoading ? "opacity-0" : ""
          }`}
        >
          Currently Listening
        </h4>
      </Marquee>
      <ol>{listCurrentlyListening}</ol>
    </div>
  );
};
