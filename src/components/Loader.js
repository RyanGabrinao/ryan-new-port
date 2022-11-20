import React, { useEffect, createContext } from "react";
import { gsap } from "gsap/dist/gsap";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create(
  "custom",
  "M0,0 C0.039,0.119 0.254,0.105 0.292,0.14 0.372,0.214 0.315,0.355 0.464,0.368 0.934,0.408 0.778,0.706 0.828,0.732 0.967,0.803 0.865,1 1,1 "
);

const Loader = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    const setLoadToFalse = () => {
      setIsLoading(false);
    };
    let loadingAnim = gsap.context(() => {
      let tl = gsap.timeline();

      tl.to("#loading-counter", {
        innerText: 100,
        duration: 2,
        ease: customEase,
        snap: "innerText",
      })
        .to(
          "#loading-bar",
          {
            width: "100%",
            duration: 2,
            ease: customEase,
          },
          "<"
        )
        .to("#loading-counter", {
          yPercent: 120,
          duration: 1.2,
          ease: "power4.inOut",
          delay: -0.4,
        })
        .to(
          "#loading-top",
          {
            yPercent: -120,
            duration: 1.2,
            ease: "power4.inOut",
          },
          "<"
        )
        .to("#loader-container", {
          opacity: 0,
          duration: 0.7,
          ease: "power4.inOut",
          delay: -0.7,
          onComplete: setLoadToFalse,
        });
    });
    return () => loadingAnim.revert();
  }, [isLoading]);

  return (
    <div
      className="fixed w-full h-screen bg-main-bg z-[4000] text-rg-white pointer-events-none"
      id="loader-container"
    >
      <div
        className="absolute top-0 left-0 w-full h-[13vmin] border-b border-rg-white"
        id="loading-top"
      >
        <div className="flex items-center justify-between w-full h-full z-[50] relative mix-blend-difference">
          <div>Ryan Gabrinao</div>
          <div>Portfolio</div>
        </div>
        <div
          className="absolute top-0 w-[0%] h-full bg-rg-white z-[10]"
          id="loading-bar"
        ></div>
      </div>
      <div className="absolute bottom-[5%] right-[2%] text-step_6 font-gambetta leading-[1] overflow-hidden">
        <span id="loading-counter" className="inline-block">
          0
        </span>
      </div>
    </div>
  );
};

export default Loader;
