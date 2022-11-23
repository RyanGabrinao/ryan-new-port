import "../styles/globals.scss";
import { useState, useEffect, createContext } from "react";
import Header from "../src/components/Header";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import { useRouter } from "next/router";
import Lenis from "@studio-freight/lenis";
import Loader from "../src/components/Loader";
import Cursor from "../src/components/Cursor";

gsap.registerPlugin(ScrollTrigger, Flip);

export const LoaderContext = createContext();
export const FlipContext = createContext();
// if (typeof window !== "undefined") {
//   const lenis = new Lenis({
//     duration: 1.7,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
//     direction: "vertical", // vertical, horizontal
//     gestureDirection: "vertical", // vertical, horizontal, both
//     smooth: true,
//     mouseMultiplier: 1,
//     smoothTouch: false,
//     touchMultiplier: 2,
//     infinite: false,
//   });

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }

//   requestAnimationFrame(raf);
// }

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [flipState, setFlipState] = useState();
  const route = useRouter();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 0.7,
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
    };

    const startScroll = () => {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
    };

    route.events.on("routeChangeStart", stopScroll);
    route.events.on("routeChangeComplete", startScroll);

    return () => {
      lenis.destroy();
      route.events.off("routeChangeStart", stopScroll);
      route.events.off("routeChangeComplete", startScroll);
    };
  }, [route.events]);

  // useEffect(() => {
  //   const pageChange = () => {
  //     setRoutingPageOffset(window.scrollY);
  //   };

  //   route.events.on("routeChangeStart", lenis);
  // }, [route.events]);

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
        <FlipContext.Provider value={{ flipState, setFlipState }}>
          <Component {...pageProps} />
        </FlipContext.Provider>
      </LoaderContext.Provider>
    </>
  );
}

export default MyApp;
