import cn from 'classnames';
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import { Form, Formik } from 'formik';
import { useAuthentication } from 'hooks/useAuthentication';
import {service as authService} from 'services/authentication';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { request, role, toastTypes, userTypes } from 'shared/types';
import * as Yup from 'yup';
import AuthField from './widgets/AuthField';
import AuthUserSelection from './widgets/AuthUserSelection';
import { useRouter } from 'node_modules/next/dist/client/router';

const formDetails = {
  defaultValues: {
    username: '',
    password: '',
  },
  schema: Yup.object().shape({
    username: Yup.string().required().email().label('Username'),
    password: Yup.string().required().label('Password'),
  }),
};

const HomeLoginModal = ({ onClose, isVisible, onRegister }) => {
  // STATES
  const [selectedUserType, setSelectedUserType] = useState(role.TENANT);
  const [rememberMeActive, setRememberMeActive] = useState(false);
  const [termsAndPolicyActive, setTermsAndPolicyActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { login, status, errors, reset } = useAuthentication();

  const router = useRouter();

  // METHODS
  const toggleRememberMe = () => setRememberMeActive((value) => !value);
  const toggleTermsAndPolicyActive = () => setTermsAndPolicyActive((value) => !value);

  const closeModal = () => {
    reset();
    onClose();
  };

  const onSelectRegister = (userType) => {
    onRegister(userType);
    closeModal();
  };

  const onSubmit = (data) => {
    if (termsAndPolicyActive) {
      login({ ...data, role: selectedUserType }, { onSuccess: onLoginSuccess });
    } else {
      addToast(
        'Please agree to the terms and agreement to proceed in logging in.',
        toastTypes.WARNING,
      );
    }
  };

  const onLoginSuccess = () => {
    addToast('Successfully logged in.', toastTypes.SUCCESS);
    closeModal();
  };

  const onLoginGoogle = async () => {
    try {
      const response = await authService.googleAuth(selectedUserType);
      router.push(response.data.to);
    }
    catch(err){ addToast(err.response.data.detail, toastTypes.ERROR); }
  }

  const onLoginFacebook = async () => {
    try {
      const response = await authService.facebookAuth(selectedUserType);
      router.push(response.data.to);
    }
    catch(err){ 
      addToast(err.response.data.detail, toastTypes.ERROR); 
    }
  }

  const onLoginApple = async () => {
    try{
      const response = await authService.appleAuth(selectedUserType);
      router.push(response.data.to);
    }
    catch(err){
      addToast(err.response.data.detail, toastTypes.ERROR)
    }
  }

  return (
    <Modal show={isVisible} onHide={closeModal} id="login-modal" centered>
      <Modal.Body>
        <AuthUserSelection
          title="LOGIN"
          userType={selectedUserType}
          onSelectUser={setSelectedUserType}
        />

        <div className="main-content mt-4">
          {!!errors?.length && errors?.map((error) => <FieldError key={error} error={error} />)}

          <Formik
            initialValues={formDetails.defaultValues}
            validationSchema={formDetails.schema}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              await sleep(500);
              setIsSubmitting(false);

              onSubmit(values);
            }}
          >
            {({ errors: formErrors, touched }) => (
              <Form className="form mt-2">
                <div className="field-group block">
                  <AuthField type="email" id="username" placeholder="Email Address" />
                  {formErrors.username && touched.username ? (
                    <FieldError error={formErrors.username} />
                  ) : null}
                </div>

                <div className="field-group mt-3 block">
                  <AuthField type="password" id="password" placeholder="Password" />
                  {formErrors.password && touched.password ? (
                    <FieldError error={formErrors.password} />
                  ) : null}
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
                    <div className="item" onClick={onLoginFacebook}>
                      <img src="/images/social-media/facebook-square.png" alt="facebook icon" />
                    </div>
                    <div className="item mx-2" onClick={onLoginGoogle}>
                      <img src="/images/social-media/google.png" alt="google icon" />
                    </div>
                    <div className="item" onClick={onLoginApple}>
                      <img src="/images/social-media/apple.png" alt="apple icon" />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="btn-login min-width"
                    loading={isSubmitting || status === request.REQUESTING}
                  >
                    LOGIN
                  </Button>
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
              </Form>
            )}
          </Formik>

          <span className="sign-up-as mt-4 d-block text-center text-dark-gray font-weight-light">
            Sign up as{' '}
            <span
              className="text-primary font-weight-bold"
              onClick={() => onSelectRegister(userTypes.TENANT)}
            >
              {' '}
              TENANT{' '}
            </span>{' '}
            or
            <span
              className="text-primary font-weight-bold"
              onClick={() => onSelectRegister(userTypes.LANDLORD)}
            >
              {' '}
              LANDLORD
            </span>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HomeLoginModal;
