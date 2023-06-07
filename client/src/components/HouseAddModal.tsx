import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-bootstrap/Modal";
import { RootState } from "../dux/rootReducer";
import HouseAddForm from "./HouseAddForm";
import { toggleModalAction } from "../dux/reducers";

const AddHouseModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const handleClose = () => {
    dispatch(toggleModalAction());
  };

  return (
    <div>
      <Modal show={isOpen} onHide={handleClose} centered>
        <div className="bg-zinc-800 rounded-md text-yellow-600">
          <Modal.Body>
            <HouseAddForm />
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default AddHouseModal;
