/* eslint-disable no-plusplus */
import cn from 'classnames';
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import dayjs from 'dayjs';
import {service as authService} from 'services/authentication'
import { Form, Formik } from 'formik';
import { useUsers } from 'hooks/useUsers';
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
import { useRouter } from 'node_modules/next/dist/client/router';

const monthOptions = [
  { label: 'Jan', value: '0' },
  { label: 'Feb', value: '1' },
  { label: 'Mar', value: '2' },
  { label: 'Apr', value: '3' },
  { label: 'May', value: '4' },
  { label: 'Jun', value: '5' },
  { label: 'Jul', value: '6' },
  { label: 'Aug', value: '7' },
  { label: 'Sep', value: '8' },
  { label: 'Oct', value: '9' },
  { label: 'Nov', value: '10' },
  { label: 'Dec', value: '11' },
];

const HomeRegisterModal = ({ initialUserType, onClose, isVisible }) => {
  // STATES
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [termsAndPolicyActive, setTermsAndPolicyActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dayOptions, setDayOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { registerTenant, registerLandlord, status, errors, reset } = useUsers();

  const router = useRouter()

  // METHODS
  useEffect(() => {
    // Year
    const year = dayjs().year();
    const lastYear = year - 100;
    const years = [];
    for (let i = year; i >= lastYear; i--) {
      years.push({ label: String(i), value: String(i) });
    }
    setYearOptions(years);

    // Day
    const days = [];
    const maxDays = dayjs().daysInMonth();
    for (let i = 1; i <= maxDays; i++) {
      days.push({ label: String(i), value: String(i) });
    }
    setDayOptions(days);
  }, []);

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
        dobMonth: String(dayjs().month()),
        dobDay: String(dayjs().date()),
        dobYear: String(dayjs().year()),
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

  const onSubmit = ({ dobDay, dobMonth, dobYear, ...data }) => {
    if (termsAndPolicyActive) {
      let register;
      let payload = {};

      if (selectedUserType === userTypes.TENANT) {
        register = registerTenant;

        let date = dayjs();
        date = date.date(dobDay);
        date = date.month(dobMonth);
        date = date.year(dobYear);

        payload = {
          ...data,
          dob: date.format('YYYY-MM-DD'),
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

  const onChangeMonth = (e, values) => {
    const { dobDay, dobYear } = values;
    const month = e.target.value;
    changeDayOptions(dobDay, month, dobYear);
  };

  const onChangeYear = (e, values) => {
    const { dobDay, dobMonth } = values;
    const year = e.target.value;
    changeDayOptions(dobDay, dobMonth, year);
  };

  const changeDayOptions = (day, month, year) => {
    let date = dayjs();
    date = date.date(day);
    date = date.month(month);
    date = date.year(year);
    const maxDays = date.daysInMonth();

    const days = [];
    for (let i = 1; i <= maxDays; i++) {
      days.push({ label: String(i), value: String(i) });
    }
    setDayOptions(days);
  };

  const onSignupGoogle = async () => {
    try {
      const response = await authService.googleAuth(selectedUserType);
      router.push(response.data.to);
    }
    catch(err){ 
      addToast(err.response.data.detail, toastTypes.ERROR); 
    }
  }

  const onSignupFacebook = async () => {
    try {
      const response = await authService.facebookAuth(selectedUserType);
      router.push(response.data.to);
    }
    catch(err){
      addToast(err.response.data.detail, toastTypes.ERROR); 
    }
  }

  const onSignupApple = async () => {
    try{
      const response = await authService.appleAuth(selectedUserType);
      router.push(response.data.to);
    }
    catch(err){
      addToast(err.response.data.detail, toastTypes.ERROR)
    }
  }

  return (
    <Modal show={isVisible} onHide={closeModal} id="register-modal" centered>
      <Modal.Body>
        <AuthUserSelection
          title="REGISTER"
          userType={selectedUserType}
          onSelectUser={setSelectedUserType}
        />
        <div className="social-media-options">
          <div className="item" onClick={onSignupFacebook}>
            <img src="/images/social-media/facebook-square.png" alt="fb icon" />
          </div>
          <div className="item mx-3" onClick={onSignupGoogle}>
            <img src="/images/social-media/google.png" alt="google icon" />
          </div>
          <div className="item" onClick={onSignupApple}>
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
            {({ values, errors: formErrors, touched, handleChange }) => (
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
                    <span className="mt-3 mb-1 d-block">Date of Birth</span>
                    <div className="row">
                      <div className="col-12 col-sm-4 mt-3 mt-sm-0">
                        <div className="field-group block">
                          <AuthFieldDatePicker
                            name="dobMonth"
                            placeholder="Month"
                            options={monthOptions}
                            onChange={(e) => {
                              handleChange(e);
                              onChangeMonth(e, values);
                            }}
                          />
                          {formErrors.dobMonth && touched.dobMonth ? (
                            <FieldError error={formErrors.dobMonth} />
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4 mt-3 mt-sm-0">
                        <div className="field-group block">
                          <AuthFieldDatePicker
                            name="dobDay"
                            placeholder="Day"
                            options={dayOptions}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          {formErrors.dobDay && touched.dobDay ? (
                            <FieldError error={formErrors.dobDay} />
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4 mt-3 mt-sm-0">
                        <div className="field-group block">
                          <AuthFieldDatePicker
                            name="dobYear"
                            placeholder="Year"
                            options={yearOptions}
                            onChange={(e) => {
                              handleChange(e);
                              onChangeYear(e, values);
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
