import React, { useEffect, useRef, useState } from "react";
import useLockBodyScroll from "../../lib/useLockBodyScroll";
import downArrow from "../../icons/down-arrow.png";

import "./MobileMenu.css";
import Logo from "../Logo/Logo";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu: React.FC<Props> = ({ open, onClose }) => {
  useLockBodyScroll(open);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (key: string) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    function handleDocClick(e: MouseEvent | TouchEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      if (!menuRef.current.contains(target)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("mousedown", handleDocClick);
      document.addEventListener("touchstart", handleDocClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("touchstart", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setOpenMenu(null);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="mobile-menu-drawer open" role="dialog" aria-modal="true">
      <div className="drawer-panel" ref={menuRef}>
        <div className="drawer-header">
          <Logo />
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="drawer-nav">
          <ul>
            <li>
              Demos
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </li>
            <li>
              <button
                className="submenu-toggle"
                onClick={() => toggleMenu("post")}
                aria-expanded={openMenu === "post"}
              >
                Post
                {openMenu === "post" ? (
                  <img
                    src={downArrow}
                    alt="Right arrow"
                    className="right-arrow"
                    style={{ transform: "rotate(-90deg)" }}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt="Down arrow"
                    className="down-arrow"
                  />
                )}
              </button>
              {openMenu === "post" && (
                <ul className="submenu">
                  <li>
                    Post Header
                    <img
                      src={downArrow}
                      alt="Right arrow"
                      className="right-arrow"
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </li>
                  <li>
                    Post Layout
                    <img
                      src={downArrow}
                      alt="Right arrow"
                      className="right-arrow"
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </li>
                  <li>
                    Share Buttons
                    <img
                      src={downArrow}
                      alt="Right arrow"
                      className="right-arrow"
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </li>
                  <li>
                    Gallery Post
                    <img
                      src={downArrow}
                      alt="Right arrow"
                      className="right-arrow"
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </li>
                  <li>
                    Video Post
                    <img
                      src={downArrow}
                      alt="Right arrow"
                      className="right-arrow"
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </li>
                </ul>
              )}
            </li>
            <li>
              Features
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </li>
            <li>
              Categories
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </li>
            <li>
              Shop
              <img src={downArrow} alt="Down arrow" className="down-arrow" />
            </li>
            <li>Buy Now</li>
          </ul>
        </nav>
      </div>

      <div className="drawer-backdrop" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
