import React, { useContext, useState, useEffect } from "react";
import { HashLink as NavLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AppContext } from "../../ContextComponents/Contextes";

const Navbar = () => {
  const { toggleModal } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  // const [paramValue, setParamValue] = useState("");

  const ClosMenu = () => {
    setMenuOpen(false);
  };
  const handelModal = () => {
    toggleModal();
    setMenuOpen(false);
  };

  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const params = currentUrl.split("/").pop();
  //   setParamValue(params);
  // }, []);

  return (
    <>
      <nav>
        <Link className="linkHome" to={`/`}>
          <text>MJabo</text>
        </Link>
        {/* for responsive device */}
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li
            onClick={() => {
              ClosMenu();
            }}
          >
            <NavLink to="/#home">Categories</NavLink>
          </li>
          <li
            onClick={() => {
              ClosMenu();
            }}
          >
            <NavLink to="/#about" a>
              Produdcts
            </NavLink>
          </li>
          <li
            onClick={() => {
              ClosMenu();
            }}
          >
            <NavLink to="/#contact">Contact</NavLink>
          </li>

          <li onClick={handelModal}>
            <NavLink>Admin</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
