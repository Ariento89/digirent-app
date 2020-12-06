import cn from 'classnames';
import { Select } from 'components/Select';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { moveInScenarioTypes } from 'shared/types';
import { PropertyInfo } from 'widgets/PropertyInfo';
import PageWrapper from 'widgets/PageWrapper';

const typeOptions = [
  { name: 'Type 1', value: 1 },
  { name: 'Type 2', value: 2 },
  { name: 'Type 3', value: 3 },
  { name: 'Type 4', value: 4 },
];

const Page = () => {
  const [selectedScenario, setSelectedScenario] = useState(moveInScenarioTypes.NO_NEED);
  const [signedDocumentModalVisible, setSignedDocumentModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [viewDocumentVisible, setViewDocumentVisible] = useState(false);
  const [type, setType] = useState(null);

  const onShowDocumentModal = () => setSignedDocumentModalVisible(true);
  const onCloseDocumentModal = () => setSignedDocumentModalVisible(false);

  const onShowConfirmationModal = () => setConfirmationModalVisible(true);
  const onCloseConfirmationModal = () => setConfirmationModalVisible(false);

  const onViewDocument = () => setViewDocumentVisible(true);
  const onCloseDocument = () => setViewDocumentVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - Contracts" pageName="contracts-landlord">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container">
          <h3 className="main-title">CONTRACTS</h3>

          <p className="main-title-2 pt-5 mt-5">
            MOVE IN <span className="font-weight-bold text-primary">PROCESS</span>
          </p>
          <p className="main-desc font-weight-bold text-dark-gray text-center mt-4">
            SELECT THE MOVE IN SCENARIO
          </p>
          <p className="main-desc text-center">
            Move in your tenant to the property and start collecting rent
          </p>

          <div className="row process-list">
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <div
                className={cn('main-box item', {
                  active: selectedScenario === moveInScenarioTypes.SEND,
                })}
                onClick={() => setSelectedScenario(moveInScenarioTypes.SEND)}
              >
                <div className="selector">
                  <img src="/images/icon/icon-check-white.svg" alt="icon" />
                </div>
                <div className="rounded-icon primary mx-auto">
                  <img src="/images/icon/icon-send-to-sign-agreement-white.svg" alt="item icon" />
                </div>
                <p className="main-desc text-center font-weight-bold text-dark">
                  Send to sign agreement
                </p>
                <p className="main-desc text-center mt-3">
                  Build the lease agreements with available templates or add your own template,
                  customize, and have tenants sign it online.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <div
                className={cn('main-box item align-self-stretch', {
                  active: selectedScenario === moveInScenarioTypes.ATTACH,
                })}
                onClick={() => setSelectedScenario(moveInScenarioTypes.ATTACH)}
              >
                <div className="selector">
                  <img src="/images/icon/icon-check-white.svg" alt="icon" />
                </div>
                <div className="rounded-icon primary mx-auto">
                  <img src="/images/icon/icon-attach-signed-agreement-white.svg" alt="item icon" />
                </div>
                <p className="main-desc text-center font-weight-bold text-dark">
                  Attach signed agreement
                </p>
                <p className="main-desc text-center mt-3">
                  If you already have tenants with signed agreements, upload the files and complete
                  the move-in process.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <div
                className={cn('main-box item', {
                  active: selectedScenario === moveInScenarioTypes.NO_NEED,
                })}
                onClick={() => setSelectedScenario(moveInScenarioTypes.NO_NEED)}
              >
                <div className="selector">
                  <img src="/images/icon/icon-check-white.svg" alt="icon" />
                </div>
                <div className="rounded-icon primary mx-auto">
                  <img src="/images/icon/icon-no-need-for-an-aggrement-white.svg" alt="item icon" />
                </div>
                <p className="main-desc text-center font-weight-bold text-dark">
                  No need for an agreement
                </p>
                <p className="main-desc text-center mt-3">
                  I got this all arranged externally. And not in need of documenting here.
                </p>
              </div>
            </div>
          </div>

          <button type="button" className="button d-block mx-auto mt-5">
            GET STARTED
          </button>

          <div className="row properties">
            {[1, 2, 3].map((key) => (
              <div key={key} className="col-12 col-md-6 col-lg-4">
                <PropertyInfo
                  name="Pahvale Villa"
                  location="Indore, Madhya Pradesh, India"
                  rentFee="246"
                  bedCount="4"
                  crCount="2"
                  buttonName="SIGNED DOCUMENTS"
                  onClick={onShowDocumentModal}
                />
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>

      <Modal
        dialogClassName="modal-xl"
        id="signed-document-modal"
        show={signedDocumentModalVisible}
        onHide={onCloseDocumentModal}
        centered
      >
        <Modal.Body>
          <button type="button" className="button-nav primary s-40" onClick={onCloseDocumentModal}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content pb-4">
            <div className="document-item">
              <button type="button" className="btn-delete" onClick={onShowConfirmationModal}>
                <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
              </button>

              <div className="document-photo" />

              <div className="document-name flex-1 text-center">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="text-sm font-weight-bold">Tony</span>
                  <span className="text-sm">, 22</span>
                  <img
                    className="ml-2"
                    src="/images/icon/icon-camera-primary.svg"
                    height="15"
                    width="15"
                    alt="icon"
                  />
                </div>
                <p className="d-block text-sm text-primary m-0">STUDENT</p>
              </div>

              <div className="divider" />

              <div className="view-documents flex-1">
                {viewDocumentVisible && (
                  <div className="documents-status">
                    <div className="item d-flex align-items-center justify-content-between">
                      <span className="normal-text font-weight-bold">Copy ID</span>
                      <span className="circular-icon check">
                        <img src="/images/icon/icon-check-white.svg" alt="icon" />
                      </span>
                      <div className="view-single-document">
                        <img src="/images/icon/icon-view-white.svg" alt="icon" />
                      </div>
                    </div>
                    <div className="item d-flex align-items-center justify-content-between mt-2">
                      <span className="normal-text font-weight-bold">Proof of Income</span>
                      <span className="circular-icon check">
                        <img src="/images/icon/icon-check-white.svg" alt="icon" />
                      </span>
                      <div className="view-single-document">
                        <img src="/images/icon/icon-view-white.svg" alt="icon" />
                      </div>
                    </div>
                    <div className="item d-flex align-items-center justify-content-between mt-2">
                      <span className="normal-text font-weight-bold">Proof of Enrolment</span>
                      <span className="circular-icon x">
                        <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
                      </span>
                    </div>
                  </div>
                )}

                {viewDocumentVisible ? (
                  <button
                    type="button"
                    className="button btn-email mx-auto close-icon"
                    onClick={onCloseDocument}
                  >
                    <img
                      className="open-icon"
                      src="/images/icon/icon-cancel-primary.svg"
                      alt="icon"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button d-block d-sm-none d-md-block mx-auto"
                    onClick={onViewDocument}
                  >
                    <span className="open-icon">VIEW DOCUMENT</span>
                  </button>
                )}

                <button
                  type="button"
                  className="button btn-email d-none d-sm-block d-md-none mx-auto"
                >
                  <img className="open-icon" src="/images/icon/icon-view-primary.svg" alt="icon" />
                </button>
              </div>

              <div className="divider" />

              <div className="flex-1">
                <span className="verified text-sm">VERIFIED</span>
              </div>

              <div className="divider" />

              <div className="flex-1">
                <button type="button" className="button btn-email d-block mx-auto">
                  <img src="/images/icon/icon-email-outline.svg" alt="icon" />
                </button>
              </div>
            </div>

            <hr className="mt-5 mb-5" />

            <div className="document-files">
              <div className="file-item">
                <span className="normal-text font-weight-bold">Contract</span>
                <button type="button" className="button ml-md-1 ml-lg-5">
                  VIEW DOCUMENT
                </button>
              </div>
              <div className="divider" />
              <div className="file-item">
                <span className="normal-text font-weight-bold">Check-in report</span>
                <button type="button" className="button ml-md-1 ml-lg-5">
                  VIEW DOCUMENT
                </button>
              </div>
            </div>

            <div className="document-upload mt-5">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="d-flex align-items-center left">
                    <span className="text-primary mr-4">Upload Document</span>
                    <Select
                      value={type}
                      onChange={(value) => setType(value)}
                      options={typeOptions}
                      placeholder="Type"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                  <div className="file-upload responsive">
                    <div className="file-select">
                      <button type="button" className="button btn-browse">
                        Browse...
                      </button>
                      <div className="main-description font-weight-light text-primary filename">
                        No document selected
                      </div>
                      <input type="file" />
                    </div>
                    <button type="button" className="button">
                      UPLOAD
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
        show={confirmationModalVisible}
        onHide={onCloseConfirmationModal}
        className="confirmation-modal"
        centered
      >
        <Modal.Body>
          <div className="modal-background" />

          <div className="main-content">
            <p className="description">
              ARE YOU SURE YOU WANT TO
              <span className="text-primary font-weight-bold">
                {' '}
                DELETE THE TENANT FROM THIS PROPERTY?
              </span>
            </p>

            <div className="mt-4 buttons">
              <button className="button btn-yes" onClick={onCloseConfirmationModal}>
                YES
              </button>
              <button className="button gray2 btn-no" onClick={onCloseConfirmationModal}>
                NO
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
