import React from "react";
import { dashboardNavbarStyles as s } from "../assets/dummyStyles";
import Logo from "./common/Logo";
import { HiMenuAlt2 } from "react-icons/hi";

const DashboardNavbar = ({ onMenuClick }) => {
  return (
    <header className={s.header}>
      <button onClick={onMenuClick} className={s.menuButton}>
        <HiMenuAlt2 size={24} />
      </button>

      <div className={s.logoContainer}>
        <Logo fontSize="1.25rem" iconSize={18} />
      </div>
    </header>
  );
};

export default DashboardNavbar;
