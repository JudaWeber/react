import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../style/navbar.scss";
import { NavDropdown } from "react-bootstrap";

let links = [
  {
    label: "Home",
    url: "/home",
  },
  {
    label: "About Us",
    url: "/aboutus",
  },
  {
    label: "Our Products",
    url: "/ourproducts",
  },
];
let adminLinks = [
  {
    label: "Manage products",
    url: "/manageproducts",
  },
  {
    label: "Manage users",
    url: "/manageusers",
  },
];
let authLinks = {
  isLoggedIn: [
    {
      label: "Logout",
      url: "/home",
    },
    {
      label: "My Cart",
      url: "/mycart",
    },
  ],
  isLoggedOut: [
    {
      label: "Login",
      url: "/login",
    },
    {
      label: "Register",
      url: "/register",
    },
  ],
};
const NavBarNew = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [expanded, setExpanded] = useState(false);
  const navCollapseRef = useRef(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogoutBtnClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    history.push("/home");
    setExpanded(false);
  };
  const handleMyCartBtnClick = () => {
    history.push("/mycart");
    setExpanded(false);
  };

  const handleLogoClick = () => {
    history.push("/home");
  };

  useEffect(() => {
    const handleClick = () => {
      setExpanded(false);
    };

    if (navCollapseRef.current) {
      const navLinks = navCollapseRef.current.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", handleClick);
      });

      return () => {
        navLinks.forEach((link) => {
          link.removeEventListener("click", handleClick);
        });
      };
    }
  }, [navCollapseRef]);

  return (
    <Fragment>
      <Navbar
        className="navbar navbar-expand-lg my-navbar sticky-top"
        expand="lg"
        expanded={expanded}
      >
        <div className="ms-5 my-logo-font me-5" onClick={handleLogoClick}>
          BeatBoutique
        </div>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav" ref={navCollapseRef}>
          <Nav className="mr-auto">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {links.map((item, index) => (
                <li className="nav-item text-light" key={index + "1"}>
                  <NavLink
                    className="nav-link navbar-collapse"
                    to={item.url}
                    isActive={(match, location) => match && match.isExact}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {isAdmin && (
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  {adminLinks.map((item, index) => (
                    <NavDropdown.Item key={"links" + index} href={item.url}>
                      {item.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              )}

              <SearchBar />
            </ul>
            <ul className="navbar-nav me-3 mb-2 mb-lg-0 ml-auto ms-lg-5">
              {loggedIn ? (
                <div className="button-div">
                  <button
                    type="button"
                    className="btn btn-outline-light m-1"
                    onClick={handleLogoutBtnClick}
                  >
                    Logout
                  </button>
                  <button
                    className="btn btn-outline-light m-1"
                    onClick={handleMyCartBtnClick}
                  >
                    <i className="bi bi-cart-fill me-2"></i>My Cart
                  </button>
                </div>
              ) : (
                <div className="button-div">
                  <button
                    type="button"
                    className="btn btn-outline-light m-1"
                    onClick={() => {
                      history.push("/login");
                      setExpanded(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-light m-1"
                    onClick={() => {
                      history.push("/register");
                      setExpanded(false);
                    }}
                  >
                    <i className="bi bi-cart-fill me-2"></i>Register
                  </button>
                </div>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default NavBarNew;
