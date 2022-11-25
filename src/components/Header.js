import { useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { gsap } from "gsap/dist/gsap";

function Header() {
  const headerRef = useRef();

  return (
    <header
      className="absolute top-0 left-0 z-10 flex items-center justify-between w-full px-2 py-4 z-[60]"
      ref={headerRef}
    >
      <Link
        href="/"
        scroll={false}
        id="logo-container"
        className="invisible pointer-events-none"
      >
        <div className="w-6 cursor-pointer interactable">
          <Logo className="w-full fill-red-600" />
        </div>
      </Link>
      <div className="font-migra text-step3">
        <Link href="/" scroll={false}>
          Home
        </Link>
        , About
      </div>
    </header>
  );
}

export default Header;
