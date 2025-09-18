import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import "./Header.css";

const Header: React.FC = () => {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState<boolean>(false);
  const lastScroll = useRef<number>(0);
  const stickyStart = useRef<number>(0);

  useEffect(() => {
    function updateVar() {
      const h = logoRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--logo-height", `${h}px`);
      stickyStart.current =
        (logoRef.current?.offsetTop ?? 0) +
        (logoRef.current?.offsetHeight ?? 0);
    }
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);

  useEffect(() => {
    function onScroll() {
      const cur = window.scrollY;
      const dirDown = cur > lastScroll.current;
      const distanceFromSticky = cur - stickyStart.current;

      if (cur <= 5) {
        setHidden(false);
      } else if (dirDown && distanceFromSticky > 200) {
        setHidden(true);
      } else if (!dirDown) {
        setHidden(false);
      }

      lastScroll.current = cur;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <div className="header-top header-hero" ref={logoRef}>
        <div className="header-container container">
          <div className="header-logo">
            <Logo />
          </div>
          <div className="header-actions">
            <button aria-label="Search" className="icon-btn">
              🔍
            </button>
          </div>
        </div>
      </div>

      <div className={`menu-sticky ${hidden ? "hidden" : ""}`}>
        <div className="container menu-inner">
          <div className="menu-item">
            Demos
            <div className="submenu">
              <a href="#">Demo 1</a>
              <a href="#">Demo 2</a>
            </div>
          </div>
          <div className="menu-item">
            Post
            <div className="submenu">
              <a href="#">Post Header</a>
              <a href="#">Post Layout</a>
            </div>
          </div>
          <div className="menu-item">Features</div>
          <div className="menu-item">Categories</div>
          <div className="menu-item">Shop</div>
          <div className="menu-item">Buy Now</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
