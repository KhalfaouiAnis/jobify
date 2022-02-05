import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

interface navLinksProps {
  toggleSidebar?: any;
}

const NavLinks = ({ toggleSidebar }: navLinksProps) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
