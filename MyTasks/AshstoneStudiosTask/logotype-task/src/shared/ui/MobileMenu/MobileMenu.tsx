import React from "react";
import "./MobileMenu.css";
import useLockBodyScroll from "../../lib/useLockBodyScroll";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu: React.FC<Props> = ({ open, onClose }) => {
  useLockBodyScroll(open);

  if (!open) return null;

  return (
    <div className="mobile-menu-drawer open" role="dialog" aria-modal="true">
      <div className="drawer-panel">
        <div className="drawer-header">
          <div className="drawer-logo">LOGOTYPE</div>
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
            <li>Demos</li>
            <li>Post</li>
            <li>Features</li>
            <li>Categories</li>
            <li>Shop</li>
            <li>Buy Now</li>
          </ul>
        </nav>
      </div>

      <div className="drawer-backdrop" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
