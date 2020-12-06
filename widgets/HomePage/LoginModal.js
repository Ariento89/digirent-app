import cn from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { userTypes } from 'shared/types';

const LoginModal = ({ onClose, isVisible }) => {
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [rememberMeActive, setRememberMeActive] = useState(false);
  const [termsAndPolicyActive, setTermsAndPolicyActive] = useState(false);

  const toggleRememberMe = () => setRememberMeActive((value) => !value);
  const toggleTermsAndPolicyActive = () => setTermsAndPolicyActive((value) => !value);

  return (
    <Modal show={isVisible} onHide={onClose} id="login-modal" centered>
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

        <p className="title">LOGIN</p>

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

        <div className="main-content mt-4">
          <div className="field-group">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="field-group mt-3">
            <input type="password" placeholder="Password" required />
          </div>

          <div className="d-flex align-items-center justify-content-between form-footer mt-3">
            <div className="d-flex align-items-center checkbox-container">
              <span
                className={cn('rounded-icon checkbox', { active: rememberMeActive })}
                onClick={toggleRememberMe}
              >
                <img src="/images/icon/icon-check-primary.svg" alt="icon" />
              </span>
              <span className="ml-3 remember-me-text" onClick={toggleRememberMe}>
                Remember me
              </span>
            </div>
            <a href="#" className="forgot-password text-primary">
              Forgot password?
            </a>
          </div>

          <div className="login-button mt-3">
            <div className="social-media-options">
              <div className="item mr-3">
                <img src="/images/social-media/facebook-square.png" alt="facebook icon" />
              </div>
              <div className="item">
                <img src="/images/social-media/google.png" alt="google icon" />
              </div>
            </div>
            <button type="button" className="button btn-login min-width">
              LOGIN
            </button>
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

          <a
            href="#"
            className="sign-up-as mt-4 d-block text-center text-dark-gray font-weight-light"
          >
            Sign up as <span className="text-primary font-weight-bold"> TENANT </span> or
            <span className="text-primary font-weight-bold"> LANDLORD</span>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
