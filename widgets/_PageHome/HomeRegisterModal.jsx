import cn from 'classnames';
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import { Form, Formik } from 'formik';
import { useUsers } from 'hooks/useUsers';
import moment from 'moment';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { request, toastTypes, userTypes } from 'shared/types';
import * as Yup from 'yup';
import AuthField from './widgets/AuthField';
import AuthFieldDatePicker from './widgets/AuthFieldDatePicker';
import AuthUserSelection from './widgets/AuthUserSelection';

const monthOptions = [
  { label: 'Jan', value: '1' },
  { label: 'Feb', value: '2' },
  { label: 'Mar', value: '3' },
  { label: 'Apr', value: '4' },
  { label: 'May', value: '5' },
  { label: 'Jun', value: '6' },
  { label: 'Jul', value: '7' },
  { label: 'Aug', value: '8' },
  { label: 'Sep', value: '9' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' },
];

const HomeRegisterModal = ({ initialUserType, onClose, isVisible }) => {
  // STATES
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [termsAndPolicyActive, setTermsAndPolicyActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { registerTenant, registerLandlord, status, errors, reset } = useUsers();

  // METHODS
  useEffect(() => {
    if (initialUserType) {
      setSelectedUserType(initialUserType);
    }
  }, [initialUserType]);

  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dobMonth: '',
        dobDay: '',
        dobYear: '',
        password: '',
        passwordConfirmation: '',
      },
      schema: Yup.object().shape({
        firstName: Yup.string().required().label('First Name'),
        lastName: Yup.string().required().label('Last Name'),
        email: Yup.string().required().email().label('Email Address'),
        phoneNumber: Yup.string().required().label('Mobile Number'),
        dobMonth:
          selectedUserType === userTypes.TENANT
            ? Yup.string().required('Required')
            : Yup.string().optional(),
        dobDay:
          selectedUserType === userTypes.TENANT
            ? Yup.string().required('Required')
            : Yup.string().optional(),
        dobYear:
          selectedUserType === userTypes.TENANT
            ? Yup.string().required('Required')
            : Yup.string().optional(),
        password: Yup.string().required().label('Password'),
        passwordConfirmation: Yup.string()
          .required()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .label('Password Confirmation'),
      }),
    }),
    [selectedUserType],
  );

  const toggleTermsAndPolicyActive = () => setTermsAndPolicyActive((value) => !value);

  const closeModal = () => {
    reset();
    onClose();
  };

  const onRegistrationSuccess = () => {
    addToast('Successfully registered. You may now login to your account.', toastTypes.SUCCESS);
    closeModal();
  };

  const onSubmit = (data) => {
    if (termsAndPolicyActive) {
      let register;
      let payload = {};

      if (selectedUserType === userTypes.TENANT) {
        register = registerTenant;
        payload = {
          ...data,
          dob: moment(data.dob).format('YYYY-MM-DD'),
          passwordConfirmation: undefined,
        };
      } else {
        register = registerLandlord;
        payload = {
          ...data,
          dob: undefined,
          passwordConfirmation: undefined,
        };
      }

      register(payload, {
        onSuccess: onRegistrationSuccess,
      });
    } else {
      addToast(
        'Please agree to the terms and agreement to proceed with the registration.',
        toastTypes.WARNING,
      );
    }
  };

  const onChangeDay = () => {};

  const onChangeMonth = () => {};

  const onChangeYear = () => {};

  return (
    <Modal show={isVisible} onHide={closeModal} id="register-modal" centered>
      <Modal.Body>
        <AuthUserSelection
          title="REGISTER"
          userType={selectedUserType}
          onSelectUser={setSelectedUserType}
        />
        <div className="social-media-options">
          <div className="item">
            <img src="/images/social-media/facebook-square.png" alt="fb icon" />
          </div>
          <div className="item mx-3">
            <img src="/images/social-media/google.png" alt="google icon" />
          </div>
          <div className="item">
            <img src="/images/social-media/apple.png" alt="apple icon" />
          </div>
        </div>

        <div className="main-content mt-4">
          {!!errors?.length && errors?.map((error) => <FieldError error={error} />)}
          <Formik
            initialValues={getFormDetails().defaultValues}
            validationSchema={getFormDetails().schema}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              await sleep(500);
              setIsSubmitting(false);

              onSubmit(values);
            }}
          >
            {({ errors: formErrors, touched, handleChange }) => (
              <Form className="form mt-2">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="field-group block">
                      <AuthField id="firstName" placeholder="First Name" />
                      {formErrors.firstName && touched.firstName ? (
                        <FieldError error={formErrors.firstName} />
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                    <div className="field-group block">
                      <AuthField id="lastName" placeholder="Last Name" />
                      {formErrors.lastName && touched.lastName ? (
                        <FieldError error={formErrors.lastName} />
                      ) : null}
                    </div>
                  </div>
                </div>

                {selectedUserType === userTypes.TENANT && (
                  <>
                    <hr />
                    <span className="mt-3">Date of Birth</span>
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="field-group block">
                          <AuthFieldDatePicker
                            name="dobMonth"
                            placeholder="Month"
                            options={monthOptions}
                            onChange={(e) => {
                              handleChange(e);
                              onChangeMonth(e);
                            }}
                          />
                          {formErrors.dobMonth && touched.dobMonth ? (
                            <FieldError error={formErrors.dobMonth} />
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="field-group block">
                          <AuthFieldDatePicker
                            name="dobDay"
                            placeholder="Day"
                            options={monthOptions}
                            onChange={(e) => {
                              handleChange(e);
                              onChangeDay(e);
                            }}
                          />
                          {formErrors.dobDay && touched.dobDay ? (
                            <FieldError error={formErrors.dobDay} />
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="field-group block">
                          <AuthFieldDatePicker
                            name="dobYear"
                            placeholder="Year"
                            options={monthOptions}
                            onChange={(e) => {
                              handleChange(e);
                              onChangeYear(e);
                            }}
                          />
                          {formErrors.dobYear && touched.dobYear ? (
                            <FieldError error={formErrors.dobYear} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                )}

                <div className="field-group block mt-3">
                  <AuthField id="phoneNumber" placeholder="Mobile Number" />
                  {formErrors.phoneNumber && touched.phoneNumber ? (
                    <FieldError error={formErrors.phoneNumber} />
                  ) : null}
                </div>

                <div className="field-group block mt-3">
                  <AuthField type="email" id="email" placeholder="Email Address" />
                  {formErrors.email && touched.email ? (
                    <FieldError error={formErrors.email} />
                  ) : null}
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-sm-6">
                    <div className="field-group block">
                      <AuthField type="password" id="password" placeholder="Password" />
                      {formErrors.password && touched.password ? (
                        <FieldError error={formErrors.password} />
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                    <div className="field-group block">
                      <AuthField
                        type="password"
                        id="passwordConfirmation"
                        placeholder="Re-enter Password"
                      />
                      {formErrors.passwordConfirmation && touched.passwordConfirmation ? (
                        <FieldError error={formErrors.passwordConfirmation} />
                      ) : null}
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

                <Button
                  type="submit"
                  className="btn-register min-width d-block mx-auto mt-4"
                  loading={isSubmitting || status === request.REQUESTING}
                >
                  REGISTER
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HomeRegisterModal;
