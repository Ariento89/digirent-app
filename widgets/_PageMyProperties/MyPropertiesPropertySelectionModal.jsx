import Button from 'components/Button/index';
import Modal from 'react-bootstrap/Modal';
import PropertySelection from './widgets/PropertySelection';

const MyPropertiesPropertySelectionModal = ({ isVisible, onClose }) => (
  <Modal id="property-selection" show={isVisible} onHide={onClose} centered>
    <Modal.Body>
      <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

      <div className="main-content">
        <p className="description">
          WHICH PROPERTY WOULD YOU LIKE TO
          <span className="text-primary font-weight-bold"> COPY?</span>
        </p>

        <PropertySelection />

        <Button className="min-width d-block mx-auto mt-4" onClick={onClose}>
          CREATE
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

export default MyPropertiesPropertySelectionModal;
