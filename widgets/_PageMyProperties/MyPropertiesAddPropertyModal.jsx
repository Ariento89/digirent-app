import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import Button from 'components/Button/index';

const MyPropertiesAddPropertyModal = ({ isVisible, onClose, showPropertySelection }) => {
  // METHODS
  const onDuplicate = () => {
    onClose();
    showPropertySelection();
  };

  return (
    <Modal
      show={isVisible}
      onHide={onClose}
      className="confirmation-modal add-property-modal"
      centered
    >
      <Modal.Body>
        <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

        <div className="main-content">
          <p className="description">
            WOULD YOU LIKE TO
            <span className="text-primary font-weight-bold"> ADD A NEW PROPERTY </span>
            <br className="d-none d-md-block" />
            OR
            <span className="text-dark-gray font-weight-bold"> DUPLICATE AN EXSTING ONE?</span>
          </p>

          <div className="mt-4 buttons">
            <Link href="/property/add">
              <Button className="btn-yes">
                <span className="font-weight-bold">ADD</span> NEW PROPERTY
              </Button>
            </Link>
            <Button className="gray2 btn-no" onClick={onDuplicate}>
              <span className="font-weight-bold">DUPLICATE</span> EXISTING PROPERTY
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyPropertiesAddPropertyModal;
