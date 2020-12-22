import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormInputIcon from 'components/FormInputIcon/index';
import { Form, Formik } from 'formik';
import { useMe } from 'hooks/useMe';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { request, toastTypes } from 'shared/types';
import * as Yup from 'yup';

const formDetails = {
  defaultValues: {
    oldPassword: '',
    newPassword: '',
  },
  schema: Yup.object().shape({
    oldPassword: Yup.string().required().label('Old Password'),
    newPassword: Yup.string()
      .required()
      .notOneOf([Yup.ref('oldPassword'), null], 'New password must not match with old password.')
      .label('New Password'),
  }),
};

const AccountPassword = () => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { updatePassword, status, errors } = useMe();

  // METHODS
  const onSuccess = () => {
    addToast('Successfully updated password.', toastTypes.SUCCESS);
  };

  const onError = () => {
    addToast('An error occurred while updating your password.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    updatePassword(data, { onSuccess, onError });
  };

  return (
    <>
      {!!errors?.length && (
        <div className="mt-2">
          {errors?.map((error) => (
            <FieldError error={error} />
          ))}
        </div>
      )}

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
          <Form>
            <div className="row mt-3">
              <div className="col-12 col-sm-6 mt-3">
                <FormInputIcon
                  name="oldPassword"
                  placeholder="Old Password"
                  icon="icon-lock-primary"
                />
                {formErrors.oldPassword && touched.oldPassword ? (
                  <FieldError error={formErrors.oldPassword} />
                ) : null}
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <FormInputIcon
                  name="newPassword"
                  placeholder="New Password"
                  icon="icon-lock-primary"
                />
                {formErrors.newPassword && touched.newPassword ? (
                  <FieldError error={formErrors.newPassword} />
                ) : null}
              </div>
            </div>

            <Button
              className="mt-4 mx-auto d-block min-width"
              loading={isSubmitting || status === request.REQUESTING}
            >
              UPDATE
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AccountPassword;
