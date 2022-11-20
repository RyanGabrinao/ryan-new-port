import { useEffect, useState } from "react";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [interacting, setInteracting] = useState(null);
  const [isProjectTab, setIsProjectTab] = useState(null);

  useEffect(() => {
    let trailer = document.querySelector("#trailer");
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      const interactable = event.target.closest(".interactable");
      const projectTab = event.target.closest(".interactable.view-case");

      setMousePosition({
        x: clientX - trailer.offsetWidth / 2,
        y: clientY - trailer.offsetHeight / 2,
      });
      setInteracting(interactable ? true : false);

      interacting
        ? (trailer.style.mixBlendMode = "normal")
        : (trailer.style.mixBlendMode = "difference");

      setIsProjectTab(projectTab ? true : false);
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    const keyframes = {
      transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${
        interacting ? 4 : 1
      })`,

      backgroundColor: interacting ? "#fff" : "#f1ede9",
    };

    trailer.animate(keyframes, {
      duration: 800,
      fill: "forwards",
    });

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [mousePosition, isProjectTab, interacting]);

  return (
    <div id="trailer" className="relative">
      {isProjectTab ? (
        <p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="font-medium absolute origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.25] text-main-bg left-1/2 top-1/2 leading-4 text-step6 whitespace-nowrap"
        >
          View Case
        </p>
      ) : null}
    </div>
  );
};

export default Cursor;
