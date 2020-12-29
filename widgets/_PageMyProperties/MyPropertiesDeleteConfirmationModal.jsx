import Button from 'components/Button/index';
import Modal from 'react-bootstrap/Modal';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';

const MyPropertiesDeleteConfirmationModal = ({ property, isVisible, onClose }) => {
  // CUSTOM HOOKS
  const { addToast } = useToasts();

  // METHODS
  const onDelete = () => {
    // TODO: Implement delete functionality once there is an endpoint.
    console.log(property);
    addToast('No backend endpoint for this yet...', toastTypes.WARNING);
  };

  return (
    <Modal show={isVisible} onHide={onClose} className="confirmation-modal" centered>
      <Modal.Body>
        <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

        <div className="main-content">
          <p className="description">
            ARE YOU SURE YOU WANT TO
            <span className="text-primary font-weight-bold"> DELETE THIS PROPERTY?</span>
          </p>

          <div className="mt-4 buttons">
            <Button className="btn-yes" onClick={onDelete}>
              YES
            </Button>
            <Button className="gray2 btn-no" onClick={onClose}>
              NO
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyPropertiesDeleteConfirmationModal;
