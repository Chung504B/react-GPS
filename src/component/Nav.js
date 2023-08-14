import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/alldata">Alldata</Link>
        </li>
        <li>
          <Link to="/overspeed">Overspeed</Link>
        </li>
        <li>
          <Link to="/piedata">No122Piedata</Link>
        </li>
        <li>
          <Link to="/No102piedata">No102Piedata</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
