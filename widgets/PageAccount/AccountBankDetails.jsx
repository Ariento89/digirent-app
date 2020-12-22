/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormInputIcon from 'components/FormInputIcon/index';
import { Form, Formik } from 'formik';
import { useMe } from 'hooks/useMe';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { request, toastTypes } from 'shared/types';
import * as Yup from 'yup';

const AccountBankDetails = () => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me, setUserBankDetails, status, errors } = useMe();

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        accountName: null, // TODO: Update if there's value
        accountNumber: null, // TODO: Update if there's value
      },
      schema: Yup.object().shape({
        accountName: Yup.string().required().nullable().label('Account Name'),
        accountNumber: Yup.string().required().nullable().label('Account Number'),
      }),
    }),
    [me],
  );

  const onSuccess = () => {
    addToast('Successfully saved the bank details.', toastTypes.SUCCESS);
  };

  const onError = () => {
    addToast('An error occurred while saving the bank details.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    setUserBankDetails(data, { onSuccess, onError });
  };

  return (
    <div className="main-box mt-4">
      <h3 className="main-box-title">Bank Details</h3>

      {!!errors?.length && (
        <div className="mt-2">
          {errors?.map((error) => (
            <FieldError error={error} />
          ))}
        </div>
      )}

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
        {({ errors: formErrors, touched }) => (
          <Form>
            <div className="mt-1">
              <div className="mt-3">
                <FormInputIcon
                  type="number"
                  name="accountName"
                  placeholder="Account Name"
                  icon="icon-account-name-primary"
                />
                {formErrors.accountName && touched.accountName ? (
                  <FieldError error={formErrors.accountName} />
                ) : null}
              </div>
              <div className="mt-3">
                <FormInputIcon
                  type="number"
                  name="accountNumber"
                  placeholder="Account Number"
                  icon="icon-account-number-primary"
                />
                {formErrors.accountNumber && touched.accountNumber ? (
                  <FieldError error={formErrors.accountNumber} />
                ) : null}
              </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <Button
                className="min-width mr-3"
                loading={isSubmitting || status === request.REQUESTING}
              >
                SAVE CHANGES
              </Button>

              <button type="button" className="button outline min-width btn-verify-payment">
                <span className="font-weight-bold">VERIFY PAYMENT</span>
                <br />
                with 0,01 ct
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountBankDetails;
