import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    showLinks
      ? (linksContainerRef.current.style.height = `${linksHeight}px`)
      : (linksContainerRef.current.style.height = `0px`);
  }, [showLinks]);

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <NavLink to="/">
            <img src={logo} alt="cocktail db logo" className="logo" />
          </NavLink>
          <button
            className="nav-toggle"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <FaBars />
          </button>
        </div>
        <div ref={linksContainerRef} className="links-container">
          <ul ref={linksRef} className="nav-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/newsletter">Newsletter</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
