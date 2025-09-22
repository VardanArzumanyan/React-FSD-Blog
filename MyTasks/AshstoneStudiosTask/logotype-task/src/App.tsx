import React, { useState, useRef, useEffect } from "react";
import Header from "./shared/ui/Header/Header";
import MobileMenu from "./shared/ui/MobileMenu/MobileMenu";
import PostsList from "./features/posts/ui/PostsList/PostsList";
import Logo from "./shared/ui/Logo/Logo";
import SearchInput from "./shared/ui/SearchInput/SearchInput";
import { SearchProvider } from "./shared/context/search/SearchContext";
import searchIcon from "./shared/icons/search.png";
import moreIcon from "./shared/icons/more.png";

import "./App.css";

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
    <SearchProvider>
      <div>
        <Header />

        <div className="mobile-header container">
          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <img src={moreIcon} alt="More options" className="more-icon" />
          </button>

          <Logo />

          <div ref={searchRef} className="search-container">
            {searchOpen ? (
              <SearchInput autoFocus />
            ) : (
              <img
                src={searchIcon}
                alt="Search icon"
                className="search-icon"
                onClick={() => setSearchOpen(true)}
              />
            )}
          </div>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main>
          <PostsList />
        </main>
      </div>
    </SearchProvider>
  );
};

export default App;
