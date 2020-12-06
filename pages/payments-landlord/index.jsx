/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Select } from 'components/Select';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';

const yearOptions = [
  { name: 'YEAR 2021', value: 2021 },
  { name: 'YEAR 2022', value: 2022 },
  { name: 'YEAR 2023', value: 2023 },
  { name: 'YEAR 2024', value: 2024 },
];

const Page = () => {
  const [keysModalVisible, setKeysModalVisible] = useState(false);
  const [sendPayReminderModalVisible, setSendPayReminderModalVisible] = useState(false);
  const [paymentsReminderVisible, setPaymentsReminderVisible] = useState(false);
  const [year, setYear] = useState(null);

  const onShowKeysModal = () => setKeysModalVisible(true);
  const onCloseKeysModal = () => setKeysModalVisible(false);

  const onShowSendPayReminderModal = () => setSendPayReminderModalVisible(true);
  const onCloseSendPayReminderModal = () => setSendPayReminderModalVisible(false);

  const onShowPaymentsReminder = () => setPaymentsReminderVisible(true);
  const onClosePaymentsReminder = () => setPaymentsReminderVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - Payments" pageName="payments-landlord">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container-fluid container-lg">
          <h3 className="main-title">PAYMENTS</h3>

          <div className="payments mt-5">
            <div className="header">
              <p className="text-escrow">UPLOAD PAYMENT TO ESCROW</p>
              <p className="text-paid">PAID</p>
              <p className="text-keys">
                HANDED THE KEYS AND DELIVERED APARTMENT AS PROMISED?
                <span className="subtitle">TO RELEASE THE PAYMENTS</span>
              </p>
            </div>

            <div className="item mt-3">
              <div className="escrow">
                <p className="column-label d-block d-md-none">UPLOAD PAYMENTS TO ESCROW</p>
                <span className="text">First monthly payment</span>
              </div>

              <div className="paid">
                <p className="column-label d-block d-md-none">PAID</p>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="button-icon green">
                    <img src="/images/icon/icon-check-white.svg" alt="icon" />
                  </button>

                  <button className="button-icon gray2">
                    <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
                  </button>
                </div>
              </div>
              <div className="keys">
                <p className="column-label d-block d-md-none">
                  HANDED THE KEYS AND DELIVERED APARTMENT AS PROMISED?
                </p>
                <div className="buttons">
                  <button className="button min-width-100" onClick={onShowKeysModal}>
                    YES
                  </button>
                  <button className="button min-width-100 gray2" onClick={onShowKeysModal}>
                    NO
                  </button>
                </div>
              </div>
            </div>

            <div className="item no-keys mt-3">
              <div className="escrow">
                <p className="column-label d-block d-md-none">UPLOAD PAYMENTS TO ESCROW</p>
                <span className="text">Security deposit</span>
              </div>

              <div className="paid">
                <p className="column-label d-block d-md-none">PAID</p>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="button-icon green">
                    <img src="/images/icon/icon-check-white.svg" alt="icon" />
                  </button>

                  <button className="button-icon gray2">
                    <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h3 className="main-subtitle monthly-payments-subtitle">
            MONTHLY <span className="font-weight-bold text-primary">PAYMENTS</span>
          </h3>

          <div className="sort">
            <p className="main-desc mr-4">Sort by:</p>

            <Select
              classNames="primary"
              value={year}
              onChange={(value) => setYear(value)}
              options={yearOptions}
              placeholder="YEAR"
            />
          </div>

          <div className="monthly-payments">
            <div className="header">
              <p className="text-escrow">MONTH</p>
              <p className="text-paid">PAID</p>
              <p className="text-keys">INVOICE</p>
            </div>

            {[1, 2, 3].map((key) => (
              <div key={key} className="item mt-3">
                <div className="escrow">
                  <p className="column-label d-block d-md-none">MONTH</p>
                  <span className="text">January</span>
                </div>

                <div className="paid">
                  <p className="column-label d-block d-md-none">PAID</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="button-icon green">
                      <img src="/images/icon/icon-check-white.svg" alt="icon" />
                    </button>

                    <button className="button-icon gray2">
                      <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
                    </button>
                  </div>
                </div>
                <div className="keys">
                  <button className="button min-width">VIEW INVOICE</button>
                </div>
              </div>
            ))}

            <div className="item mt-3">
              <div className="escrow">
                <p className="column-label d-block d-md-none">MONTH</p>
                <span className="text">April</span>
              </div>

              <div className="paid position-relative">
                <p className="column-label d-block d-md-none">PAID</p>
                <div className="d-flex align-items-center justify-content-center">
                  {paymentsReminderVisible && (
                    <div className="payments-reminder">
                      <div className="item d-flex align-items-center">
                        <span className="circular-icon mr-2" />
                        <span className="text">SEND PAYMENT REMINDER</span>
                      </div>
                    </div>
                  )}
                  <button className="button-icon gray2">
                    <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
                  </button>

                  <button
                    className="button-icon btn-send-payments primary"
                    onMouseOver={onShowPaymentsReminder}
                    onMouseOut={onClosePaymentsReminder}
                    onClick={onShowSendPayReminderModal}
                  >
                    <img src="/images/icon/icon-euro-white.svg" alt="icon" />
                    <p className="question-icon">?</p>
                  </button>
                </div>
              </div>
              <div className="keys">
                <button className="button min-width disabled">NOT AVAILABLE</button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>

      <Modal
        show={keysModalVisible}
        onHide={onCloseKeysModal}
        className="confirmation-modal"
        centered
      >
        <Modal.Body>
          <div className="modal-background" />

          <div className="main-content">
            <p className="description">
              DID YOU HANDED THE KEYS AND DELIVER APARTMENTS AS PROMISED?
            </p>

            <div className="mt-4 buttons">
              <button className="button btn-yes" onClick={onCloseKeysModal}>
                YES
              </button>
              <button className="button gray2 btn-no" onClick={onCloseKeysModal}>
                NO
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={sendPayReminderModalVisible}
        onHide={onCloseSendPayReminderModal}
        className="confirmation-modal"
        centered
      >
        <Modal.Body>
          <div className="modal-background" />

          <div className="main-content">
            <p className="description">ARE YOU SURE YOU WANT TO SEND A PAY REMINDER?</p>

            <div className="mt-4 buttons">
              <button className="button btn-yes" onClick={onCloseSendPayReminderModal}>
                YES
              </button>
              <button className="button gray2 btn-no" onClick={onCloseSendPayReminderModal}>
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
