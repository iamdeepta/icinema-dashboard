import React, { useContext, useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { getUsers } from "../context/userContext/apiCalls";
import { UserContext } from "../context/userContext/UserContext";
import UserModals from "./UserModals";
import "./css/catalog_content.scss";
//import AppUrl from "../classes/AppUrl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  //const handleClose = () => setSelectedId(null);
  const handleShow = (e, id) => {
    e.preventDefault();

    setSelectedId(id);
  };

  const { users, error, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      {/* <!-- main content --> */}
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            {/* <!-- main title --> */}
            <div className="col-12">
              <div className="main__title">
                <h2>Users</h2>

                <span className="main__title-stat">{users.length} total</span>

                <div className="main__title-wrap">
                  {/* <!-- filter sort --> */}
                  {/* <div className="filter" id="filter__sort">
                    <span className="filter__item-label">Sort by:</span>

                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="navigation"
                      id="filter-sort"
                      data-toggle="dropdown"
                      //   aria-haspopup="true"
                      //   aria-expanded="false"
                    >
                      <input type="button" value="Date created" />
                      <span></span>
                    </div>

                    <ul
                      className="filter__item-menu dropdown-menu scrollbar-dropdown"
                      aria-labelledby="filter-sort"
                    >
                      <li>Date created</li>
                      <li>Pricing plan</li>
                      <li>Status</li>
                    </ul>
                  </div> */}
                  {/* <!-- end filter sort --> */}

                  {/* <!-- search --> */}
                  <form action="#" className="main__title-form">
                    <input
                      type="text"
                      placeholder="Find user.."
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="button">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8.25998"
                          cy="8.25995"
                          r="7.48191"
                          stroke="#2F80ED"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></circle>
                        <path
                          d="M13.4637 13.8523L16.3971 16.778"
                          stroke="#2F80ED"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </form>
                  {/* <!-- end search --> */}
                </div>
              </div>
            </div>
            {/* <!-- end main title --> */}

            {/* <!-- users --> */}
            <div className="col-12">
              <div className="main__table-wrap">
                <table className="main__table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>BASIC INFO</th>
                      {/* <th>USERNAME</th> */}
                      <th>PRICING PLAN</th>
                      {/* <th>COMMENTS</th>
                      <th>REVIEWS</th> */}
                      <th>STATUS</th>
                      <th>SIGNUP DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users
                      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                      .filter((u) => {
                        if (searchTerm === "") {
                          return u;
                        } else if (
                          u.username
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                        ) {
                          return u;
                        } else if (
                          u.pricingPlan
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                        ) {
                          return u;
                        } else if (
                          u.createdAt
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                        ) {
                          return u;
                        } else if (
                          u.email
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                        ) {
                          return u;
                        }
                      })
                      .map((item, index) => (
                        <tr key={item._id}>
                          <td>
                            <div className="main__table-text">{index + 1}</div>
                          </td>
                          <td>
                            <div className="main__user">
                              <div className="main__avatar">
                                <img src="images/user.svg" alt="" />
                              </div>
                              <div className="main__meta">
                                <h3>{item.username}</h3>
                                <span>{item.email}</span>
                              </div>
                            </div>
                          </td>
                          {/* <td>
                        <div className="main__table-text">Username</div>
                      </td> */}
                          <td>
                            <div className="main__table-text">
                              {item.pricingPlan}
                            </div>
                          </td>
                          {/* <td>
                        <div className="main__table-text">13</div>
                      </td>
                      <td>
                        <div className="main__table-text">1</div>
                      </td> */}
                          <td>
                            <div
                              className={
                                item.isAdmin
                                  ? "main__table-text main__table-text--green"
                                  : "main__table-text main__table-text--red"
                              }
                            >
                              {item.isAdmin ? "Admin" : "User"}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-text">
                              {item.createdAt.substr(0, 10)}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-btns">
                              {/* <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a> */}
                              {/* <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a> */}
                              <a
                                href="!#"
                                className="main__table-btn main__table-btn--delete open-modal"
                                onClick={(e) => handleShow(e, item._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}

                    {/* <tr>
                      <td>
                        <div className="main__table-text">24</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Free</div>
                      </td>
                      <td>
                        <div className="main__table-text">1</div>
                      </td>
                      <td>
                        <div className="main__table-text">15</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--green">
                          Approved
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">25</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Premium</div>
                      </td>
                      <td>
                        <div className="main__table-text">6</div>
                      </td>
                      <td>
                        <div className="main__table-text">6</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--green">
                          Approved
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">26</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Free</div>
                      </td>
                      <td>
                        <div className="main__table-text">11</div>
                      </td>
                      <td>
                        <div className="main__table-text">15</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--red">
                          Banned
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">27</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Basic</div>
                      </td>
                      <td>
                        <div className="main__table-text">0</div>
                      </td>
                      <td>
                        <div className="main__table-text">0</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--green">
                          Approved
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">28</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Free</div>
                      </td>
                      <td>
                        <div className="main__table-text">2</div>
                      </td>
                      <td>
                        <div className="main__table-text">1</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--green">
                          Approved
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">29</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Cinematic</div>
                      </td>
                      <td>
                        <div className="main__table-text">65</div>
                      </td>
                      <td>
                        <div className="main__table-text">0</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--green">
                          Approved
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">30</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Premium</div>
                      </td>
                      <td>
                        <div className="main__table-text">0</div>
                      </td>
                      <td>
                        <div className="main__table-text">0</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--red">
                          Banned
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">31</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Premium</div>
                      </td>
                      <td>
                        <div className="main__table-text">13</div>
                      </td>
                      <td>
                        <div className="main__table-text">1</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--green">
                          Approved
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="main__table-text">32</div>
                      </td>
                      <td>
                        <div className="main__user">
                          <div className="main__avatar">
                            <img src="images/user.svg" alt="" />
                          </div>
                          <div className="main__meta">
                            <h3>John Doe</h3>
                            <span>email@email.com</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">Username</div>
                      </td>
                      <td>
                        <div className="main__table-text">Free</div>
                      </td>
                      <td>
                        <div className="main__table-text">1</div>
                      </td>
                      <td>
                        <div className="main__table-text">15</div>
                      </td>
                      <td>
                        <div className="main__table-text main__table-text--red">
                          Banned
                        </div>
                      </td>
                      <td>
                        <div className="main__table-text">24 Oct 2021</div>
                      </td>
                      <td>
                        <div className="main__table-btns">
                          <a
                            href="#modal-status"
                            className="main__table-btn main__table-btn--banned open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                            </svg>
                          </a>
                          <a
                            href="edit-user.html"
                            className="main__table-btn main__table-btn--edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z" />
                            </svg>
                          </a>
                          <a
                            href="#modal-delete"
                            className="main__table-btn main__table-btn--delete open-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- end users --> */}

            {/* <!-- paginator --> */}
            {/* <div className="col-12">
              <div className="paginator">
                <span className="paginator__pages">10 from 3 702</span>

                <ul className="paginator__paginator">
                  <li>
                    <a href="/">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.75 5.36475L13.1992 5.36475"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M5.771 10.1271L0.749878 5.36496L5.771 0.602051"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li className="active">
                    <a href="/">1</a>
                  </li>
                  <li>
                    <a href="/">2</a>
                  </li>
                  <li>
                    <a href="/">3</a>
                  </li>
                  <li>
                    <a href="/">4</a>
                  </li>
                  <li>
                    <a href="/">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.1992 5.3645L0.75 5.3645"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M8.17822 0.602051L13.1993 5.36417L8.17822 10.1271"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <!-- end paginator --> */}
          </div>
        </div>
      </main>
      {/* <!-- end main content --> */}

      {selectedId && (
        <UserModals
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          error={error}
          dispatch={dispatch}
        />
      )}

      {/* <!-- modal status --> */}
      {/* <div id="modal-status" class="zoom-anim-dialog mfp-hide modal">
        <h6 class="modal__title">Status change</h6>

        <p class="modal__text">Are you sure about immediately change status?</p>

        <div class="modal__btns">
          <button class="modal__btn modal__btn--apply" type="button">
            Apply
          </button>
          <button class="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div> */}
      {/* <!-- end modal status --> */}

      {/* <!-- modal delete --> */}
      {/* <div id="modal-delete" className="zoom-anim-dialog mfp-hide modal">
        <h6 className="modal__title">User delete</h6>

        <p className="modal__text">
          Are you sure to permanently delete this user?
        </p>

        <div className="modal__btns">
          <button className="modal__btn modal__btn--apply" type="button">
            Delete
          </button>
          <button className="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div> */}
      {/* <!-- end modal delete --> */}
    </>
  );
};

export default User;
