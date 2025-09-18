import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import SearchInput from "../../ui/SearchInput/SearchInput";
import searchIcon from "../../icons/search.png";
import downArrow from "../../icons/down-arrow.png";
import "./Header.css";

const Header: React.FC = () => {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState<boolean>(false);
  const lastScroll = useRef<number>(0);
  const stickyStart = useRef<number>(0);

  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <header>
      <div className="header-top header-hero" ref={logoRef}>
        <div className="header-container container">
          <div className="header-logo">
            <Logo />
          </div>

          <div className="header-actions" ref={searchRef}>
            {searchOpen ? (
              <SearchInput autoFocus />
            ) : (
              <button
                aria-label="Search"
                className="icon-btn"
                onClick={() => setSearchOpen(true)}
              >
                <img
                  src={searchIcon}
                  alt="Search icon"
                  className="search-icon"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`menu-sticky ${hidden ? "hidden" : ""}`}>
        <div className="container menu-inner">
          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Demos
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Post
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
            <div className="submenu">
              <div>Post Header</div>
              <div>Post Layout</div>
              <div>Share Buttons</div>
              <div>Gallery Post</div>
              <div>Video Post</div>
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Features
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Categories
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Shop
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>
          <div className="menu-item">Buy Now</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
