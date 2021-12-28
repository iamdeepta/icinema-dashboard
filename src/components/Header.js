import React from "react";
import "./css/header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* <!-- header --> */}
      <header className="header">
        <div className="header__content">
          {/* <!-- header logo --> */}
          <Link to="/" className="header__logo">
            <img src="images/icinema_logo.png" alt="" />
            <span>iCinema</span>
          </Link>
          {/* <!-- end header logo --> */}

          {/* <!-- header menu btn --> */}
          <button className="header__btn" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>
          {/* <!-- end header menu btn --> */}
        </div>
      </header>
      {/* <!-- end header --> */}
    </>
  );
};

export default Header;
