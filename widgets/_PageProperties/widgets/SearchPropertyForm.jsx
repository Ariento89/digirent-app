import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import FormSelect from 'components/FormSelect/index';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { sleep } from 'shared/functions';
import { availabilityOptions, houseTypeOptions, locationOptions } from 'shared/options';
import * as Yup from 'yup';

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
  { name: 'Option 4', value: 4 },
];

const SearchPropertyForm = ({ onSubmit }) => {
  // STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        location: null,
        houseType: null,
        rentalPrice: null,
        availability: null,
        amenities: null,
        sqft: null,
      },
      schema: Yup.object().shape({
        location: Yup.string().required().nullable().label('Location'),
        houseType: Yup.string().required().nullable().label('House Type'),
        rentalPrice: Yup.string().required().nullable().label('Rental Price'),
        availability: Yup.string().required().nullable().label('Availability'),
        amenities: Yup.string().required().nullable().label('Amenities'),
        sqft: Yup.string().required().nullable().label('Sqft'),
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
                    <p className="main-desc pb-2">Rental Price</p>
                    <FormSelect name="rentalPrice" placeholder="Rental Price" options={options} />
                    {errors.rentalPrice && touched.rentalPrice ? (
                      <FieldError error={errors.rentalPrice} />
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
                    <p className="main-desc pb-2">Availability</p>
                    <FormSelect
                      name="availability"
                      placeholder="Availability"
                      options={availabilityOptions}
                    />
                    {errors.availability && touched.availability ? (
                      <FieldError error={errors.availability} />
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
                    <p className="main-desc pb-2">Amenities</p>
                    <FormSelect name="amenities" placeholder="Amenities" options={options} />
                    {errors.amenities && touched.amenities ? (
                      <FieldError error={errors.amenities} />
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
                    <p className="main-desc pb-2">Sqft</p>
                    <FormSelect name="sqft" placeholder="Sqft" options={options} />
                    {errors.sqft && touched.sqft ? <FieldError error={errors.sqft} /> : null}
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

export default SearchPropertyForm;
