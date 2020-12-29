import Button from 'components/Button/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropertySelection from './widgets/PropertySelection';

const MyPropertiesPropertySelectionModal = ({ properties, isVisible, onClose }) => {
  // STATES
  const [selectedProperty, setSelectedProperty] = useState(null);

  // CUSTOM HOOKS
  const router = useRouter();

  // METHODS
  const onSelect = (property) => {
    setSelectedProperty(property);
  };

  const onDuplicate = () => {
    if (selectedProperty) {
      router.push(`/my-properties/duplicate/${selectedProperty.id}`);
    }
  };

  return (
    <Modal id="property-selection" show={isVisible} onHide={onClose} centered>
      <Modal.Body>
        <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

        <div className="main-content">
          <p className="description">
            WHICH PROPERTY WOULD YOU LIKE TO
            <span className="text-primary font-weight-bold"> COPY?</span>
          </p>

          <PropertySelection
            selectedProperty={selectedProperty}
            properties={properties}
            onSelect={onSelect}
          />

          <Button className="min-width d-block mx-auto mt-4" onClick={onDuplicate}>
            CREATE
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyPropertiesPropertySelectionModal;
