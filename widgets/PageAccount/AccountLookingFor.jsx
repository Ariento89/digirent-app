/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormInputIcon from 'components/FormInputIcon/index';
import FormSelect from 'components/FormSelect/index';
import { Form, Formik } from 'formik';
import { useMe } from 'hooks/useMe';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { cityOptions, houseTypeOptions } from 'shared/options';
import { request, toastTypes } from 'shared/types';
import * as Yup from 'yup';

const AccountLookingFor = () => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me, setTenantLookingFor, status, errors } = useMe();

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        houseType: null, // TODO: Update if there's value
        city: null, // TODO: Update if there's value
        maxBudget: null, // TODO: Update if there's value
      },
      schema: Yup.object().shape({
        houseType: Yup.string().required().nullable().label('House Type'),
        city: Yup.string().required().nullable().label('City'),
        maxBudget: Yup.number().required().nullable().min(0).label('Max Budget'),
      }),
    }),
    [me],
  );

  const onSuccess = () => {
    addToast('Successfully saved the things that you are looking for.', toastTypes.SUCCESS);
  };

  const onError = () => {
    addToast(
      'An error occurred while saving the things that you are looking for.',
      toastTypes.ERROR,
    );
  };

  const onSubmit = (data) => {
    setTenantLookingFor(data, { onSuccess, onError });
  };

  return (
    <div className="main-box mt-4">
      <h3 className="main-box-title">What I am looking for</h3>

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
            <div className="row mt-1">
              <div className="col-12 col-sm-6 mt-3">
                <FormSelect
                  name="houseType"
                  placeholder="House Type"
                  options={houseTypeOptions}
                  icon="icon-house-primary"
                />
                {formErrors.houseType && touched.houseType ? (
                  <FieldError error={formErrors.houseType} />
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
              <div className="col-12 mt-3">
                <FormInputIcon
                  type="number"
                  name="maxBudget"
                  placeholder="Max Budget"
                  icon="icon-euro-primary"
                />
                {formErrors.maxBudget && touched.maxBudget ? (
                  <FieldError error={formErrors.maxBudget} />
                ) : null}
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

export default AccountLookingFor;
