import "../styles/globals.scss";
import { useState, useEffect, createContext } from "react";
import Header from "../src/components/Header";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import Lenis from "@studio-freight/lenis";
import Loader from "../src/components/Loader";
import Cursor from "../src/components/Cursor";

gsap.registerPlugin(ScrollTrigger, Flip);

export const LoaderContext = createContext();

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader setIsLoading={setIsLoading} isLoading={isLoading} />
      ) : (
        <Cursor />
      )}

      <Header />
      <LoaderContext.Provider
        value={{
          isLoading,
          setIsLoading,
        }}
      >
        <Component {...pageProps} />
      </LoaderContext.Provider>
    </>
  );
}

export default MyApp;
