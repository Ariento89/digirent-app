import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormSelect from 'components/FormSelect/index';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { sleep } from 'shared/functions';
import { genderOptions, houseTypeOptions, locationOptions } from 'shared/options';
import * as Yup from 'yup';

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
  { name: 'Option 4', value: 4 },
];

const SearchTenantForm = ({ onSubmit }) => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        location: null,
        houseType: null,
        maxBudget: null,
        gender: null,
        age: null,
        tenantType: null,
      },
      schema: Yup.object().shape({
        location: Yup.string().nullable().label('Location'),
        houseType: Yup.string().nullable().label('House Type'),
        maxBudget: Yup.string().nullable().label('Max Budget'),
        gender: Yup.string().nullable().label('Gender'),
        age: Yup.string().nullable().label('Age'),
        tenantType: Yup.string().nullable().label('Tenant Type'),
      }),
    }),
    [],
  );

  return (
    <div className="SearchForm">
      <div className="outer-box">
        <div className="inner-box">
          <div className="main-icon rounded-icon not-responsive">
            <img src="/images/icon/icon-people-primary.svg" alt="item icon" />
          </div>

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
            {({ errors, touched }) => (
              <Form>
                <div className="row">
                  <div className="col-12 col-sm-6 col-lg-4">
                    <p className="main-desc pb-2">Location</p>
                    <FormSelect name="location" placeholder="Location" options={locationOptions} />
                    {errors.location && touched.location ? (
                      <FieldError error={errors.location} />
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-sm-0">
                    <p className="main-desc pb-2">Type of house</p>
                    <FormSelect
                      name="houseType"
                      placeholder="Type of house"
                      options={houseTypeOptions}
                    />
                    {errors.houseType && touched.houseType ? (
                      <FieldError error={errors.houseType} />
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-0">
                    <p className="main-desc pb-2">Max Budget</p>
                    <FormSelect name="maxBudget" placeholder="Max Budget" options={options} />
                    {errors.maxBudget && touched.maxBudget ? (
                      <FieldError error={errors.maxBudget} />
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
                    <p className="main-desc pb-2">Gender</p>
                    <FormSelect name="gender" placeholder="Gender" options={genderOptions} />
                    {errors.gender && touched.gender ? <FieldError error={errors.gender} /> : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
                    <p className="main-desc pb-2">Age</p>
                    <FormSelect name="age" placeholder="Age" options={options} />
                    {errors.age && touched.age ? <FieldError error={errors.age} /> : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
                    <p className="main-desc pb-2">Tenant Type</p>
                    <FormSelect name="tenantType" placeholder="Tenant Type" options={options} />
                    {errors.tenantType && touched.tenantType ? (
                      <FieldError error={errors.tenantType} />
                    ) : null}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="min-width btn-search not-transparent"
                  loading={isSubmitting}
                >
                  SEARCH
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SearchTenantForm;
