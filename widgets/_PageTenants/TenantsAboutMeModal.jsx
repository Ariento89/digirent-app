import Button from 'components/Button/index';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';

const TenantsAboutMeModal = ({ tenant, isVisible, onClose }) => {
  // CUSTOM HOOKS
  const router = useRouter();

  // METHODS
  const onMessage = () => {
    router.push({
      pathname: '/messages',

      query: {
        isDirect: true,
        userId: tenant.id,
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        profileImageUrl: tenant.profileImageUrl,
        role: tenant.role,
      },
    });
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
          <p className="description font-weight-bold">ABOUT ME</p>

          <p className="description">
            HI, MY NAME IS{' '}
            <span className="font-weight-bold text-primary">
              {tenant?.firstName} {tenant?.lastName}
            </span>{' '}
            AND I AM LOOKING FOR AN APARTMENT.
          </p>

          <div className="mt-4 buttons">
            <Button className="btn-yes" onClick={onMessage}>
              MESSAGE
            </Button>
            <Button className="gray2 btn-no" onClick={() => null}>
              SEND BOOKING REQUEST
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TenantsAboutMeModal;
