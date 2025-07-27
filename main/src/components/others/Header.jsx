import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Link class="navbar-brand" to="/" style={{ color: "	#ffffff" }}>
          Navbar
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/signin" style={{ color: "#ffffff" }}>
                Sign In
              </Link>
            </li>
            <li class="nav-item active">
              <Link
                class="nav-link"
                to="/createAccount"
                style={{ color: "#ffffff" }}
              >
                Create Account
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/films" style={{ color: "#ffffff" }}>
                Films
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/lists" style={{ color: "#ffffff" }}>
                Lists
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/journal" style={{ color: "#ffffff" }}>
                Journal
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 d-flex">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
