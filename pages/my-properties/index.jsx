import cn from 'classnames';
import Select from 'components/Select/index';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';
import ReactionItem from 'widgets/ReactionItem/index';
import MyPropertiesAddedProperties from 'widgets/_PageMyProperties/MyPropertiesAddedProperties';
import MyPropertiesLanding from 'widgets/_PageMyProperties/MyPropertiesLanding';

const yearOptions = [
  { name: 'OPTION 1', value: 1 },
  { name: 'OPTION 2', value: 2 },
  { name: 'OPTION 3', value: 3 },
  { name: 'OPTION 4', value: 4 },
];

const Page = () => {
  const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = useState(false);
  const [addPropertyModalVisible, setAddPropertyModalVisible] = useState(false);
  const [propertySelectionModalVisible, setPropertySelectionModalVisible] = useState(false);
  const [seeReactionModalVisible, setSeeReactionModalVisible] = useState(false);
  const [propertySelectionDropdownVisible, setPropertySelectionDropdownVisible] = useState(false);
  const [year, setYear] = useState(null);

  const onDeleteProperty = () => setDeleteConfirmationModalVisible(true);
  const onCloseDeletePropertyModal = () => setDeleteConfirmationModalVisible(false);

  const onAddProperty = () => setAddPropertyModalVisible(true);
  const onCloseAddPropertyModal = () => setAddPropertyModalVisible(false);

  const onShowPropertySelection = () => setPropertySelectionModalVisible(true);
  const onClosePropertySelectionModal = () => setPropertySelectionModalVisible(false);

  const onSeeReaction = () => setSeeReactionModalVisible(true);
  const onCloseSeeReactionModal = () => setSeeReactionModalVisible(false);

  const togglePropertySelectionDropdown = () => {
    setPropertySelectionDropdownVisible((value) => !value);
  };

  return (
    <>
      <PageWrapper title="DigiRent - My Properties" pageName="property">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <MyPropertiesLanding onAddProperty={onAddProperty} />

        <MyPropertiesAddedProperties
          onSeeReaction={onSeeReaction}
          onDeleteProperty={onDeleteProperty}
        />
      </PageWrapper>

      <Modal
        dialogClassName="modal-xl"
        id="see-reactions-modal"
        show={seeReactionModalVisible}
        onHide={onCloseSeeReactionModal}
        centered
      >
        <Modal.Body>
          <button
            type="button"
            className="button-nav primary s-40"
            onClick={onCloseSeeReactionModal}
          >
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content pb-4">
            <div className="table-header">
              <span className="main-desc">Results 1 - 2 of 2</span>

              <div className="sort">
                <span className="main-desc mr-2 mr-sm-4">Sort by:</span>

                <Select
                  classNames="primary"
                  value={year}
                  onChange={(value) => setYear(value)}
                  options={yearOptions}
                  placeholder="DATE (NEW-OLD)"
                />
              </div>
            </div>

            <ReactionItem />
            <ReactionItem />
            <ReactionItem />
            <ReactionItem />
            <ReactionItem />

            <div className="pagination mt-5">
              <button type="button" className="btn-arrow prev">
                <img src="/images/icon/icon-caret-left-white.svg" alt="icon" />
              </button>
              <div className="pages">
                <span className="number active">
                  01
                  <span className="line" />
                </span>
                <span className="number">02</span>
                <span className="number">03</span>
                <span className="number">04</span>
                <span className="number">05</span>
              </div>
              <button type="button" className="btn-arrow next">
                <img src="/images/icon/icon-caret-right-white.svg" alt="icon" />
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={deleteConfirmationModalVisible}
        onHide={onCloseDeletePropertyModal}
        className="confirmation-modal"
        centered
      >
        <Modal.Body>
          <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

          <div className="main-content">
            <p className="description">
              ARE YOU SURE YOU WANT TO
              <span className="text-primary font-weight-bold"> DELETE THIS PROPERTY?</span>
            </p>

            <div className="mt-4 buttons">
              <button className="button btn-yes" onClick={onCloseDeletePropertyModal}>
                YES
              </button>
              <button className="button gray2 btn-no" onClick={onCloseDeletePropertyModal}>
                NO
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={addPropertyModalVisible}
        onHide={onCloseAddPropertyModal}
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
                <button type="button" className="button btn-yes">
                  <span className="font-weight-bold">ADD</span> NEW PROPERTY
                </button>
              </Link>
              <button
                type="button"
                className="button gray2 btn-no"
                onClick={() => {
                  onShowPropertySelection();
                  onCloseAddPropertyModal();
                }}
              >
                <span className="font-weight-bold">DUPLICATE</span> EXISTING PROPERTY
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={propertySelectionModalVisible}
        onHide={onClosePropertySelectionModal}
        id="property-selection"
        centered
      >
        <Modal.Body>
          <img src="/images/modal-bg.svg" className="modal-background" alt="modal bg" />

          <div className="main-content">
            <p className="description">
              WHICH PROPERTY WOULD YOU LIKE TO
              <span className="text-primary font-weight-bold"> COPY?</span>
            </p>

            <div className="property-selection mt-4">
              <div className="initial-value">
                <div className="item">
                  <div className="house-photo" />
                  <div className="house-info">
                    <span className="title">Pahvale Villa</span>
                    <span className="main-desc text-primary font-weight-light mt-1">LANDLORD</span>
                  </div>
                </div>
                <button className="btn-dropdown" onClick={togglePropertySelectionDropdown}>
                  <img src="/images/icon/icon-caret-down-white.svg" alt="icon" />
                </button>
              </div>

              <div className={cn('property-list', { 'd-none': !propertySelectionDropdownVisible })}>
                {[1, 2, 3].map((key) => (
                  <div key={key} className="item" onClick={togglePropertySelectionDropdown}>
                    <div className="house-photo" />
                    <div className="house-info">
                      <span className="title">Pahvale Villa</span>
                      <span className="main-desc text-primary font-weight-light mt-1">
                        LANDLORD
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="button min-width d-block mx-auto mt-4"
              onClick={onClosePropertySelectionModal}
            >
              CREATE
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
