import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <header className="absolute top-0 left-0 flex items-center justify-between w-full px-2 py-4 z-[5]">
      {/* <Link href="/" scroll={false}> */}
      <div className="w-6 cursor-pointer interactable">
        <Logo className="w-full fill-red-600" />
      </div>
      {/* </Link> */}
      <div className="font-migra text-step3">About</div>
    </header>
  );
}

export default Header;
