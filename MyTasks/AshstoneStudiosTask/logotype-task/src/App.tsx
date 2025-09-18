import React, { useState } from "react";
import Header from "./shared/ui/Header/Header";
import MobileMenu from "./shared/ui/MobileMenu/MobileMenu";
import PostsList from "./features/posts/ui/PostsList/PostsList";
import Logo from "./shared/ui/Logo/Logo";
import "./App.css";

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <div>
      <Header />

      <div className="mobile-header container">
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
        <Logo />
        <div>🔍</div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main>
        <PostsList />
      </main>
    </div>
  );
};

export default App;
