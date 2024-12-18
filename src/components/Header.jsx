import insights from "../assets/insight-favcon.png";
import { navigation } from "../constants";
import { useLocation } from "react-router-dom";
import { Button } from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

export function Header() {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      disablePageScroll();
      setOpenNavigation(false);
    } else {
      enablePageScroll();
      setOpenNavigation(true);
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    setOpenNavigation(false);
    disablePageScroll();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="flex w-[12rem] xl:mr-8" href="#hero">
          <img src={insights} width={70} height={70} alt="Insights Logo" />
          <h1 className="flex items-center px-5 text-3xl text-purple-500 ">
            Insights
          </h1>
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] right-0 left-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover-text-n-1 xl:px-12`}
                onClick={handleClick}
              >
                {item.title}
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New Account
        </a>
        <Button className="button hidden lg:block">Sign in</Button>
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
}
