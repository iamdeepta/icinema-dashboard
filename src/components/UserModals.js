import React from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../context/userContext/apiCalls";
import "./css/catalog_content.scss";

const UserModals = ({ selectedId, setSelectedId, error, dispatch }) => {
  const deleteItem = (id) => {
    deleteUser(id, dispatch);
    setSelectedId(null);
    if (!error) {
      toast.success("User Deleted Successfully");
    } else {
      toast.error("User cannot be deleted. Try again.");
    }
  };
  return (
    <>
      {/* <!-- modal status --> */}
      <div id="modal-status" className="zoom-anim-dialog mfp-hide modal">
        <h6 className="modal__title">Status change</h6>

        <p className="modal__text">
          Are you sure about immediately change status?
        </p>

        <div className="modal__btns">
          <button className="modal__btn modal__btn--apply" type="button">
            Apply
          </button>
          <button className="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div>
      {/* <!-- end modal status --> */}

      {/* <!-- modal delete --> */}
      <div id="modal-delete" className="zoom-anim-dialog modal">
        <h6 className="modal__title">User delete</h6>

        <p className="modal__text">
          Are you sure to permanently delete this user?
        </p>

        <div className="modal__btns">
          <button
            className="modal__btn modal__btn--apply"
            type="button"
            onClick={() => deleteItem(selectedId)}
          >
            Delete
          </button>
          <button
            className="modal__btn modal__btn--dismiss"
            type="button"
            onClick={() => setSelectedId(null)}
          >
            Dismiss
          </button>
        </div>
      </div>
      {/* <!-- end modal delete -->  */}
    </>
  );
};

export default UserModals;
