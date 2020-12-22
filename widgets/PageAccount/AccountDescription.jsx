import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormTextarea from 'components/FormTextarea/index';
import { Form, Formik } from 'formik';
import { useMe } from 'hooks/useMe';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { request, toastTypes } from 'shared/types';
import * as Yup from 'yup';

const AccountDescription = () => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me, updateProfileInformation, status, errors } = useMe();

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        firstName: me?.firstName,
        lastName: me?.lastName,
        dob: me?.dob,
        email: me?.email,
        phoneNumber: me?.phoneNumber,
        city: me?.city,
        gender: me?.gender,
        description: me?.description,
      },
      schema: Yup.object().shape({
        description: Yup.string().required().nullable().label('Description'),
      }),
    }),
    [me],
  );

  const onSuccess = () => {
    addToast('Successfully updated profile description.', toastTypes.SUCCESS);
  };

  const onError = () => {
    addToast('An error occurred while updating your profile description.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    updateProfileInformation(data, { onSuccess, onError });
  };

  return (
    <div className="main-box mt-4">
      <h3 className="main-box-title">Profile Description</h3>

      {!!errors?.length && (
        <div className="mt-2">
          {errors?.map((error) => (
            <FieldError error={error} />
          ))}
        </div>
      )}

      <div className="mt-4">
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
              <FormTextarea
                name="description"
                placeholder="Description"
                icon="icon-left-align-primary"
              />
              {formErrors.description && touched.description ? (
                <FieldError error={formErrors.description} />
              ) : null}

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
    </div>
  );
};

export default AccountDescription;
