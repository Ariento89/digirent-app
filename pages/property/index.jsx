import cn from 'classnames';
import { Select } from 'components/Select/index';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';
import ReactionItem from 'widgets/Property/ReactionItem';
import { PropertyInfo, propertyInfoSelectionType } from 'widgets/PropertyInfo/index';

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

  const getSelectionType = (number) => {
    if ([1, 4].includes(number)) return propertyInfoSelectionType.NOT_SELECTED;
    if ([2, 5].includes(number)) return propertyInfoSelectionType.SELECTED;
    if ([3, 6].includes(number)) return propertyInfoSelectionType.STILL_TO_COMMENT;
    return null;
  };
  return (
    <>
      <PageWrapper title="DigiRent - Property" pageName="property">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <div className="landing">
          <div className="content">
            <div className="left">
              <div className="title">LET&apos;S START!</div>
              <div className="subtitle">
                <span className="add-text">ADD</span>
                <span>
                  YOUR PROPERTIES AND ATTRACT
                  <br /> QUALITY TENANTS
                </span>
              </div>
            </div>

            <div className="right">
              <div className="outer-circle">
                <div className="inner-circle">
                  <button type="button" className="button" onClick={onAddProperty}>
                    <img src="/images/icon/icon-plus-white.svg" alt="icon" />
                  </button>
                  <span className="mt-2 mt-md-3">Add Property</span>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-down">
            <div className="white-space" />
            <div className="scroll-down-wrapper">
              <img
                src="/images/scroll-down-space.svg"
                className="scroll-down-space"
                alt="icon space"
              />
              <img
                src="/images/icon/icon-caret-down-white.svg"
                className="scroll-down"
                alt="icon"
              />
            </div>
            <div className="white-space" />
          </div>
        </div>

        <div className="container added-properties">
          <h3 className="main-title">
            ADDED <span className="text-primary font-weight-bold">PROPERTIES</span>
          </h3>

          <div className="row properties">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <div key={key} className="col-12 col-md-6 col-xl-4">
                <PropertyInfo
                  houseImage={`/images/house-sample-${(key % 3) + 1}.jpg`}
                  name="Pahvale Villa"
                  location="Indore, Madhya Pradesh, India"
                  rentFee="246"
                  bedCount="4"
                  crCount="2"
                  buttonName="SEE REACTIONS"
                  onClick={onSeeReaction}
                  onDelete={onDeleteProperty}
                  selectionType={getSelectionType(key)}
                />
              </div>
            ))}
          </div>
        </div>
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
