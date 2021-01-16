import Modal from 'react-bootstrap/Modal';

const TenantsAboutMeModal = ({ tenant, isVisible, onClose }) => (
  <Modal
    show={isVisible}
    onHide={onClose}
    className="confirmation-modal add-property-modal"
    centered
  >
    <Modal.Body>
      <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

      <div className="main-content">
        <p className="description font-weight-bold">ABOUT ME</p>

        <p className="description">
          HI, MY NAME IS{' '}
          <span className="font-weight-bold text-primary">
            {tenant?.firstName} {tenant?.lastName}
          </span>{' '}
          AND I AM LOOKING FOR AN APARTMENT.
        </p>

        <div className="mt-4 buttons">
          <button type="button" className="button btn-yes" onClick={onClose}>
            MESSAGE
          </button>
          <button type="button" className="button gray2 btn-no" onClick={onClose}>
            SEND BOOKING REQUEST
          </button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default TenantsAboutMeModal;
