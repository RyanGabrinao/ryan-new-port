import "../styles/globals.scss";
import { useState, useEffect, useCallback, createContext } from "react";
import Header from "../src/components/Header";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import { useRouter } from "next/router";
import Lenis from "@studio-freight/lenis";
import Loader from "../src/components/Loader";
import Cursor from "../src/components/Cursor";
import { Desktop } from "../utils/mediaQueries";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../src/components/PageTransition";

gsap.registerPlugin(ScrollTrigger, Flip);

export const LoaderContext = createContext();

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flipState, setFlipState] = useState();
  const route = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
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
    const stopScroll = () => {
      lenis.stop();
      setIsTransitioning(true);
    };

    const startScroll = () => {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
      setIsTransitioning(false);
    };

    route.events.on("routeChangeStart", stopScroll);
    route.events.on("routeChangeComplete", startScroll);

    return () => {
      lenis.destroy();
      route.events.off("routeChangeStart", stopScroll);
      route.events.off("routeChangeComplete", startScroll);
      cancelAnimationFrame(raf);
    };
  }, [route.events]);

  return (
    <>
      {isLoading ? (
        <Loader setIsLoading={setIsLoading} isLoading={isLoading} />
      ) : (
        <Desktop>
          <Cursor />
        </Desktop>
      )}

      <Header />
      {/* <PageTransition route={route.asPath} flipState={flipState}> */}
      <Component
        {...pageProps}
        key={route.asPath}
        flipState={flipState}
        setFlipState={setFlipState}
        isLoading={isLoading}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
      />
      {/* </PageTransition> */}
    </>
  );
}

export default MyApp;
