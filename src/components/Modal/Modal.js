import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const BpvModal = ({
  title = 'Modal Window',
  subtitle = 'Confirm your data',
  children,
  openBtn: OpenBtn,
  onSubmit
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!OpenBtn && (
        <button className="btn" onClick={() => setIsOpen(true)}>
          Open modal
        </button>
      )}
      {OpenBtn && <div onClick={() => setIsOpen(true)}>{OpenBtn}</div>}
      <Modal
        classNames={{ modal: 'booking-modal' }}
        open={isOpen}
        focusTrapped={true}
        closeOnOverlayClick={false}
        onClose={() => setIsOpen(false)}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-subtitle">{subtitle}</p>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            cancel
          </button>
          <button
            className="btn"
            onClick={() => onSubmit(() => setIsOpen(false))}
          >
            confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BpvModal;
