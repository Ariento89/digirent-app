import { Select } from 'components/Select';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { PropertyInfo } from 'widgets/PropertyInfo';
import PageWrapper from 'widgets/PageWrapper';

const typeOptions = [
  { name: 'Type 1', value: 1 },
  { name: 'Type 2', value: 2 },
  { name: 'Type 3', value: 3 },
  { name: 'Type 4', value: 4 },
];

const Page = () => {
  const [signedDocumentModalVisible, setSignedDocumentModalVisible] = useState(false);
  const [type, setType] = useState(null);

  const onShow = () => setSignedDocumentModalVisible(true);
  const onClose = () => setSignedDocumentModalVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - Contracts" pageName="contracts-tenant">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container">
          <h3 className="main-title">CONTRACTS</h3>

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
                  onClick={onShow}
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
        onHide={onClose}
        centered
      >
        <Modal.Body>
          <button type="button" className="button-nav primary s-40" onClick={onClose}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content pb-4">
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
    </>
  );
};

export default Page;
