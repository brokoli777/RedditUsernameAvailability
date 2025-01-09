import React from "react";

import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className=" navbar navbar-dark navbar-expand-md shadow-sm ">
        <div className="container">
          <a className="navbar-brand" href="https://bregwin-jogi.netlify.app/">
            {" "}
            Bregwin Jogi
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://bregwin-jogi.netlify.app/#about"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://bregwin-jogi.netlify.app/#contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
