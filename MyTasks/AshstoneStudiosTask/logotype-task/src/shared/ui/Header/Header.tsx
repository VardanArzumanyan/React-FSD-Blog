import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import SearchInput from "../../ui/SearchInput/SearchInput";
import searchIcon from "../../icons/search.png";
import downArrow from "../../icons/down-arrow.png";
import "./Header.css";

const Header: React.FC = () => {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const lastScrollY = useRef(0);
  const stickyThreshold = useRef(0);

  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const CLOSE_DELAY = 180;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenuNow = (key: string) => {
    clearCloseTimer();
    setOpenMenu(key);
  };

  const closeMenuDelayed = (key?: string) => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu((prev) => (key ? (prev === key ? null : prev) : null));
      closeTimer.current = null;
    }, CLOSE_DELAY);
  };

  const closeAllMenus = useCallback(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (logoRef.current) {
        const height = logoRef.current.offsetHeight;
        stickyThreshold.current = height;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDirection =
            currentScrollY > lastScrollY.current ? "down" : "up";

          const shouldBeSticky = currentScrollY >= stickyThreshold.current;

          if (shouldBeSticky !== isSticky) {
            setIsSticky(shouldBeSticky);
          }

          if (shouldBeSticky) {
            const distanceFromSticky = currentScrollY - stickyThreshold.current;

            if (scrollDirection === "down" && distanceFromSticky > 200) {
              if (!isHidden) setIsHidden(true);
            } else if (scrollDirection === "up") {
              if (isHidden) setIsHidden(false);
            }
          } else {
            if (isHidden) setIsHidden(false);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky, isHidden]);

  useEffect(() => {
    function handleDocClick(e: MouseEvent | TouchEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      if (!menuRef.current.contains(target)) {
        closeAllMenus();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAllMenus();
    }
    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("touchstart", handleDocClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("touchstart", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [closeAllMenus]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
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

      <div
        className={`menu-sticky ${isSticky ? "is-sticky" : ""} ${
          isHidden ? "is-hidden" : ""
        }`}
        ref={menuRef}
        style={{
          top: isSticky ? 0 : "auto",
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className=" menu-inner">
          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Demos
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>

          <div
            className={`menu-item ${openMenu === "post" ? "open" : ""}`}
            onMouseEnter={() => openMenuNow("post")}
            onMouseLeave={() => closeMenuDelayed("post")}
          >
            <div
              className="menu-item-with-submenu"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu((prev) => (prev === "post" ? null : "post"));
              }}
              role="button"
              aria-expanded={openMenu === "post"}
            >
              Post
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>

            <div
              className="submenu"
              onMouseEnter={() => openMenuNow("post")}
              onMouseLeave={() => closeMenuDelayed("post")}
            >
              <div>
                Post Header
                <img
                  src={downArrow}
                  alt="Right arrow"
                  className="right-arrow"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
              <div>
                Post Layout
                <img
                  src={downArrow}
                  alt="Right arrow"
                  className="right-arrow"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
              <div>
                Share Buttons
                <img
                  src={downArrow}
                  alt="Right arrow"
                  className="right-arrow"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
              <div>
                Gallery Post
                <img
                  src={downArrow}
                  alt="Right arrow"
                  className="right-arrow"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
              <div>
                Video Post
                <img
                  src={downArrow}
                  alt="Right arrow"
                  className="right-arrow"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-item-with-submenu">
              Features
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>

          <div className="menu-item ">
            <div className="menu-item-with-submenu">
              Categories
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </div>
          </div>

          <div className="menu-item ">
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
