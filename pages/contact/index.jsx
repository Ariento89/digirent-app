import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';
import Link from 'next/link';

const Page = () => {
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const onShow = () => setContactModalVisible(true);

  const onClose = () => setContactModalVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - Contact" pageName="contact">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container">
          <h3 className="main-title">CONTACT US</h3>
          <p className="main-subtitle mt-5 dark-gray">
            Do you have a question regarding <br className="d-block d-sm-none" />
            <span className="text-primary font-weight-bold">Digi Rent</span>?
          </p>
          <p className="main-subtitle dark-gray">
            Please have a look at our FAQ. If you can&apos;t find a solution there, feel free to
            contact us.
          </p>
          <div className="text-center">
            <Link href="faq">
              <a className="button btn-visit-faq min-width">
                VISIT <span className="font-weight-bold">FAQ</span>
              </a>
            </Link>
          </div>

          <div className="contacts row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="item main-box">
                <div className="rounded-icon not-responsive mx-auto">
                  <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
                </div>
                <p className="title mt-2 mb-0 font-weight-bold text-center">EMAIL</p>
                <p className="main-desc mt-3 text-center">Within 1 workday a reply</p>
                <div className="footer mt-3">
                  <span className="main-desc text-primary">Send us an email</span>
                  <button type="button" className="button-nav" onClick={onShow}>
                    <img src="/images/icon/icon-arrow-right-primary.svg" alt="item icon" />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="item main-box">
                <div className="rounded-icon not-responsive mx-auto">
                  <img src="/images/icon/icon-phone-call-primary.svg" alt="item icon" />
                </div>
                <p className="title mt-2 mb-0 font-weight-bold text-center">CALL</p>
                <p className="main-desc mt-3 text-center">
                  <span className="text-primary">Mon</span> —
                  <span className="text-primary">Fri</span> — 8:00 — 18:00
                </p>
                <div className="footer mt-3">
                  <span className="main-desc text-primary">Call 0800 — 9383</span>
                  <button type="button" className="button-nav">
                    <img src="/images/icon/icon-arrow-right-primary.svg" alt="item icon" />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="item main-box">
                <div className="rounded-icon not-responsive mx-auto">
                  <img src="/images/icon/icon-map-marker-primary.svg" alt="item icon" />
                </div>
                <p className="title mt-2 mb-0 font-weight-bold text-center">LOCATION</p>
                <p className="main-desc mt-3 text-center">Veraartlaan 12</p>
                <div className="footer mt-3">
                  <span className="main-desc text-primary">Get directions</span>
                  <button type="button" className="button-nav">
                    <a
                      href="https://goo.gl/maps/AWGpYVQa4nZRG5xr6"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/icon/icon-arrow-right-primary.svg" alt="item icon" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>

      <Modal show={contactModalVisible} onHide={onClose} id="contact-modal" centered>
        <Modal.Body>
          <div className="modal-background" />
          <button type="button" className="button-nav primary s-40" onClick={onClose}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content">
            <div className="rounded-icon mx-auto">
              <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
            </div>

            <span className="main-title mt-4 d-block font-weight-bold text-center">
              ASK YOUR QUESTION
            </span>
            <span className="main-description font-weight-light mt-1 d-block text-center text-primary">
              Please fill in the form
            </span>

            <div className="form-fields mx-auto mt-5 px-4">
              <div className="field-group">
                <div className="field-icon">
                  <img src="/images/icon/icon-text-primary.svg" alt="item icon" />
                </div>
                <span className="field-divider" />
                <input type="text" placeholder="Subject" required />
              </div>

              <div className="field-group mt-3">
                <div className="field-icon">
                  <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
                </div>
                <span className="field-divider" />
                <input type="email" placeholder="Email Address" required />
              </div>

              <div className="file-upload mt-4 mt-lg-5">
                <div className="file-select">
                  <button type="button" className="button btn-browse" id="fileName">
                    Browse...
                  </button>
                  <div className="main-description font-weight-light ml-3 text-primary filename">
                    No document selected
                  </div>
                  <input type="file" />
                </div>
                <button type="button" className="button">
                  SELECT
                </button>
              </div>

              <div className="field-group mt-4 mt-lg-5">
                <div className="field-icon">
                  <img src="/images/icon/icon-left-align-primary.svg" alt="item icon" />
                </div>
                <span className="field-divider long" />
                <textarea placeholder="Where can we help you with?" required />
              </div>

              <button type="button" className="button d-block mt-5 mx-auto">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
