import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import { RootState } from '../dux/rootReducer';
import HouseForm from './HouseForm';
import { toggleModalAction } from '../dux/reducers';

const AddHouseModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const handleClose = () => {
    dispatch(toggleModalAction());
  };

  return (
    <div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Body>
          <HouseForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddHouseModal;
