/* eslint-disable no-param-reassign */
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormDatePicker from 'components/FormDatePicker/index';
import FormInputIcon from 'components/FormInputIcon/index';
import FormSelect from 'components/FormSelect/index';
import { Form, Formik } from 'formik';
import { useMe } from 'hooks/useMe';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { cityOptions, genderOptions } from 'shared/options';
import { request, toastTypes } from 'shared/types';
import * as Yup from 'yup';

const AccountGeneral = () => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me, updateProfileInformation, status, errors } = useMe();

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        firstName: me?.firstName || '',
        lastName: me?.lastName || '',
        dob: me?.dob || '',
        phoneNumber: me?.phoneNumber || '',
        city: me?.city || '',
        gender: me?.gender || '',
        email: me?.email || '',
      },
      schema: Yup.object().shape({
        firstName: Yup.string().required().label('First Name'),
        lastName: Yup.string().required().label('Last Name'),
        email: Yup.string().required().email().label('Email Address'),
        phoneNumber: Yup.string().required().label('Mobile Number'),
        dob: Yup.string().required().label('Date of Birth'),
        city: Yup.string().required().nullable().label('City'),
        gender: Yup.string().required().nullable().label('Gender'),
      }),
    }),
    [me],
  );

  const onSuccess = () => {
    addToast('Successfully updated profile information.', toastTypes.SUCCESS);
  };

  const onError = () => {
    addToast('An error occurred while updating your profile information.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    updateProfileInformation(data, { onSuccess, onError });
  };

  return (
    <div className="mt-3">
      {!!errors?.length && errors?.map((error) => <FieldError key={error} error={error} />)}

      <Formik
        initialValues={getFormDetails().defaultValues}
        validationSchema={getFormDetails().schema}
        onSubmit={async (values) => {
          setIsSubmitting(true);

          // Transform
          values.dob = moment(values.dob).format('YYYY-MM-DD');

          await sleep(500);
          setIsSubmitting(false);

          onSubmit(values);
        }}
      >
        {({ errors: formErrors, touched }) => (
          <Form>
            <div className="row ">
              <div className="col-12 col-sm-6 mt-3">
                <FormInputIcon name="firstName" placeholder="First Name" icon="icon-user-primary" />
                {formErrors.firstName && touched.firstName ? (
                  <FieldError error={formErrors.firstName} />
                ) : null}
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <FormInputIcon name="lastName" placeholder="Last Name" icon="icon-user-primary" />
                {formErrors.lastName && touched.lastName ? (
                  <FieldError error={formErrors.lastName} />
                ) : null}
              </div>

              <div className="col-12 col-sm-6 mt-3">
                <FormDatePicker
                  name="dob"
                  placeholder="Date of Birth"
                  icon="icon-calendar-primary"
                  pickerProps={{
                    disabledDays: { after: new Date() },
                  }}
                />
                {formErrors.dob && touched.dob ? <FieldError error={formErrors.dob} /> : null}
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <FormInputIcon
                  name="phoneNumber"
                  placeholder="Phone Number"
                  icon="icon-smartphone-primary"
                />
                {formErrors.phoneNumber && touched.phoneNumber ? (
                  <FieldError error={formErrors.phoneNumber} />
                ) : null}
              </div>

              <div className="col-12 col-sm-6 mt-3">
                <FormSelect
                  name="city"
                  placeholder="City"
                  options={cityOptions}
                  icon="icon-map-marker-primary"
                />
                {formErrors.city && touched.city ? <FieldError error={formErrors.city} /> : null}
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <FormSelect
                  name="gender"
                  placeholder="Gender"
                  options={genderOptions}
                  icon="icon-gender-primary"
                />
                {formErrors.gender && touched.gender ? (
                  <FieldError error={formErrors.gender} />
                ) : null}
              </div>

              <div className="col-12 mt-3">
                <FormInputIcon name="email" placeholder="Email Address" icon="icon-email-primary" />
                {formErrors.email && touched.email ? <FieldError error={formErrors.email} /> : null}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 mx-auto d-block min-width"
              loading={isSubmitting || status === request.REQUESTING}
            >
              SAVE CHANGES
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountGeneral;
