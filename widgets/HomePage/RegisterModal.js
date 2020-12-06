import cn from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { userTypes } from 'shared/types';

const RegisterModal = ({ onClose, isVisible }) => {
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [termsAndPolicyActive, setTermsAndPolicyActive] = useState(false);

  const toggleTermsAndPolicyActive = () => setTermsAndPolicyActive((value) => !value);

  return (
    <Modal show={isVisible} onHide={onClose} id="register-modal" centered>
      <Modal.Body>
        <div className="icon-user rounded-icon primary mx-auto">
          <img src="/images/icon/icon-user-white.svg" alt="item icon" />
        </div>
        <div className="top-toggle mx-auto d-block">
          <img
            className="toggle-bg mx-auto"
            src="/images/login-register-toggle.svg"
            alt="background"
          />
          <div
            className={cn('toggle-icon tenant-icon', {
              active: selectedUserType === userTypes.TENANT,
            })}
          />
          <div
            className={cn('toggle-icon landlord-icon', {
              active: selectedUserType === userTypes.LANDLORD,
            })}
          />
        </div>

        <p className="title">REGISTER</p>

        <div className="button-toggler mt-2 d-flex">
          <button
            type="button"
            className={cn('button min-width btn-as-tenant', {
              active: selectedUserType === userTypes.TENANT,
            })}
            onClick={() => setSelectedUserType(userTypes.TENANT)}
          >
            AS TENANT
          </button>
          <button
            type="button"
            className={cn('button min-width btn-as-landlord', {
              active: selectedUserType === userTypes.LANDLORD,
            })}
            onClick={() => setSelectedUserType(userTypes.LANDLORD)}
          >
            AS LANDLORD
          </button>
        </div>

        <div className="social-media-options">
          <div className="item mr-3">
            <img src="/images/social-media/facebook-square.png" alt="fb icon" />
          </div>
          <div className="item">
            <img src="/images/social-media/google.png" alt="google icon" />
          </div>
        </div>

        <div className="main-content mt-4">
          <div className="tenant-fields fields-container active">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="field-group">
                  <input type="text" placeholder="First Name" required />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                <div className="field-group">
                  <input type="text" placeholder="Last Name" required />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 col-sm-6">
                <div className="field-group">
                  <input type="text" placeholder="Date of Birth" required />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                <div className="field-group">
                  <input type="text" placeholder="Mobile Number" required />
                </div>
              </div>
            </div>

            <div className="field-group mt-3">
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="row mt-3">
              <div className="col-12 col-sm-6">
                <div className="field-group">
                  <input type="password" placeholder="Password" required />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                <div className="field-group">
                  <input type="password" placeholder="Re-enter Password" />
                </div>
              </div>
            </div>
          </div>

          <div className="landlord-fields fields-container">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="field-group">
                  <input type="text" placeholder="First Name" required />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                <div className="field-group">
                  <input type="text" placeholder="Last Name" required />
                </div>
              </div>
            </div>

            <div className="field-group mt-3">
              <input type="text" placeholder="Mobile Number" required />
            </div>

            <div className="field-group mt-3">
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="row mt-3">
              <div className="col-12 col-sm-6">
                <div className="field-group">
                  <input type="password" placeholder="Password" required />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                <div className="field-group">
                  <input type="password" placeholder="Re-enter Password" />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center mt-4 i-agree checkbox-container">
            <span
              className={cn('rounded-icon checkbox', { active: termsAndPolicyActive })}
              onClick={toggleTermsAndPolicyActive}
            >
              <img src="/images/icon/icon-check-primary.svg" alt="icon" />
            </span>
            <span className="ml-3 i-agree-text" onClick={toggleTermsAndPolicyActive}>
              I agree to the
              <Link href="extra-information" target="_blank">
                <a className="text-primary"> Terms of Use </a>
              </Link>
              and
              <Link href="extra-information#cookies" target="_blank">
                <a className="text-primary"> Privacy Policy</a>
              </Link>
            </span>
          </div>

          <button type="button" className="button btn-register min-width d-block mx-auto mt-4">
            REGISTER
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
