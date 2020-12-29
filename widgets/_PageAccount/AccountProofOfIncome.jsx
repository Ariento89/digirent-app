/* eslint-disable react-hooks/exhaustive-deps */
import FieldError from 'components/FieldError/FieldError';
import FormFileUpload from 'components/FormFileUpload/index';
import { Form, Formik } from 'formik';
import { useMe } from 'hooks/useMe';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { MAX_FILE_SIZE, SUPPORTED_FILE_UPLOAD_FORMATS } from 'shared/constants';
import { sleep } from 'shared/functions';
import { request, toastTypes } from 'shared/types';
import * as Yup from 'yup';

const AccountProofOfIncome = () => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me, uploadProofOfIncome, status, errors } = useMe();

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        file: null, // TODO: Update if there's value
      },
      schema: Yup.object().shape({
        file: Yup.mixed()
          .nullable()
          .required('A file is required')
          .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
          .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value && SUPPORTED_FILE_UPLOAD_FORMATS.includes(value.type),
          ),
      }),
    }),
    [me],
  );

  const onSuccess = () => {
    addToast('Successfully uploaded Proof of Income.', toastTypes.SUCCESS);
  };

  const onError = () => {
    addToast('An error occurred while uploading Proof of Income.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    uploadProofOfIncome(data, { onSuccess, onError });
  };

  return (
    <div className="main-box mt-4">
      <div className="d-flex align-items-center">
        <h3 className="main-box-title">Proof Of Income</h3>
        <span className="circular-icon x ml-3">
          <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
        </span>

        <span className="circular-icon check ml-1">
          <img src="/images/icon/icon-check-white.svg" alt="icon" />
        </span>
      </div>

      <div className="mt-4">
        {!!errors?.length && (
          <div className="mb-2">
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
              <FormFileUpload name="file" loading={isSubmitting || status === request.REQUESTING} />
              {formErrors.file && touched.file ? <FieldError error={formErrors.file} /> : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AccountProofOfIncome;
