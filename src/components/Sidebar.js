import React, { useContext } from "react";
import "./css/sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../context/authContext/AuthActions";
import { AuthContext } from "../context/authContext/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const signout = () => {
    // navigate("/signout");
    dispatch(logout());
  };
  return (
    <>
      {/* <!-- sidebar --> */}
      <div className="sidebar">
        {/* <!-- sidebar logo --> */}
        <Link to="/" className="sidebar__logo">
          <img src="images/icinema_logo.png" alt="" />
          <span>iCinema</span>
        </Link>
        {/* <!-- end sidebar logo --> */}

        {/* <!-- sidebar user --> */}
        <div className="sidebar__user">
          <div className="sidebar__user-img">
            <img src="images/user.svg" alt="" />
          </div>

          <div className="sidebar__user-title">
            <span>Admin</span>
            <p>iCinema</p>
          </div>

          <button
            className="sidebar__user-btn"
            type="button"
            onClick={() => signout()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
            </svg>
          </button>
        </div>
        {/* <!-- end sidebar user --> */}

        {/* <!-- sidebar nav --> */}
        <ul className="sidebar__nav">
          <li className="sidebar__nav-item">
            <Link
              to="/"
              className="sidebar__nav-link sidebar__nav-link--active"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z" />
              </svg>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="sidebar__nav-item">
            <Link to="/catalog" className="sidebar__nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10,13H3a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,20H4V15H9ZM21,2H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,9H15V4h5Zm1,4H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,21,13Zm-1,7H15V15h5ZM10,2H3A1,1,0,0,0,2,3v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,10,2ZM9,9H4V4H9Z" />
              </svg>{" "}
              <span>Contents</span>
            </Link>
          </li>

          <li className="sidebar__nav-item">
            <Link to="/add-item" className="sidebar__nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,5.5H12.72l-.32-1a3,3,0,0,0-2.84-2H5a3,3,0,0,0-3,3v13a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V8.5A3,3,0,0,0,19,5.5Zm1,13a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5.5a1,1,0,0,1,1-1H9.56a1,1,0,0,1,.95.68l.54,1.64A1,1,0,0,0,12,7.5h7a1,1,0,0,1,1,1Z" />
              </svg>{" "}
              <span>Add Content</span>
            </Link>
          </li>

          {/* <!-- collapse --> */}
          {/* <li className="sidebar__nav-item">
            <a
              className="sidebar__nav-link"
              data-toggle="collapse"
              href="#collapseMenu"
              role="button"
              aria-expanded="false"
              aria-controls="collapseMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,5.5H12.72l-.32-1a3,3,0,0,0-2.84-2H5a3,3,0,0,0-3,3v13a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V8.5A3,3,0,0,0,19,5.5Zm1,13a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5.5a1,1,0,0,1,1-1H9.56a1,1,0,0,1,.95.68l.54,1.64A1,1,0,0,0,12,7.5h7a1,1,0,0,1,1,1Z" />
              </svg>{" "}
              <span>Pages</span>{" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
              </svg>
            </a>

            <ul className="collapse sidebar__menu" id="collapseMenu">
              <li>
                <Link to="/add-item">Add item</Link>
              </li>
              <li>
                <Link to="/edit-user">Edit user</Link>
              </li>
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/forgot">Forgot password</Link>
              </li>
              <li>
                <Link to="/error">404 page</Link>
              </li>
            </ul>
          </li> */}
          {/* <!-- end collapse --> */}

          <li className="sidebar__nav-item">
            <Link to="/users" className="sidebar__nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z" />
              </svg>{" "}
              <span>Users</span>
            </Link>
          </li>

          {/* <li className="sidebar__nav-item">
            <Link to="/comments" className="sidebar__nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z" />
              </svg>{" "}
              <span>Comments</span>
            </Link>
          </li> */}

          {/* <li className="sidebar__nav-item">
            <Link to="/reviews" className="sidebar__nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
              </svg>{" "}
              <span>Reviews</span>
            </Link>
          </li> */}
          {/* <li className="sidebar__nav-item">
            <a
              href="https://dmitryvolkov.me/demo/flixtv/main/index.html"
              className="sidebar__nav-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
              </svg>{" "}
              <span>Back to FlixTV</span>
            </a>
          </li> */}
        </ul>
        {/* <!-- end sidebar nav --> */}

        {/* <!-- sidebar copyright --> */}
        <div className="sidebar__copyright">
          © iCinema, 2021. <br />
          Create by{" "}
          <a
            href="https://designhubtechnologies.com"
            target="_blank"
            rel="noreferrer"
          >
            Designhub Technologies
          </a>
        </div>
        {/* <!-- end sidebar copyright --> */}
      </div>
      {/* <!-- end sidebar --> */}
    </>
  );
};

export default Sidebar;
