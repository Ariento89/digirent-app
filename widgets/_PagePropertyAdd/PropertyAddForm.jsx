/* eslint-disable no-param-reassign */
import Button from 'components/Button/index';
import Checkbox from 'components/Checkbox/index';
import Spinner from 'components/Spinner/index';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { MAX_FILE_SIZE, SUPPORTED_IMAGE_UPLOAD_FORMATS } from 'shared/constants';
import { sleep } from 'shared/functions';
import PropertyAddAmenities from 'widgets/_PagePropertyAdd/PropertyAddAmenities';
import PropertyAddMainDetails from 'widgets/_PagePropertyAdd/PropertyAddMainDetails';
import PropertyAddQuantities from 'widgets/_PagePropertyAdd/PropertyAddQuantities';
import * as Yup from 'yup';
import PropertyAddImages from './PropertyAddImages';

const PropertyAddForm = ({ errors, amenities, apartment, onSubmit, isLoading, loadingText }) => {
  // STATES
  const [isSponsorChecked, setIsSponsorChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        // Main
        name: apartment?.name || '',
        monthlyPrice: apartment?.monthlyPrice || '',
        utilitiesPrice: apartment?.utilitiesPrice || '',
        address: apartment?.address || '',
        country: apartment?.country || '',
        state: apartment?.state || '',
        city: apartment?.city || '',
        description: apartment?.description || '',
        latitude: apartment?.latitude || '',
        longitude: apartment?.longitude || '',

        // Quantities
        houseType: apartment?.houseType || null,
        bedrooms: apartment?.bedrooms || null,
        bathrooms: apartment?.bathrooms || null,
        furnishType: apartment?.furnishType || null,
        size: apartment?.size || '',
        availableFrom: apartment?.availableFrom || '',
        availableTo: apartment?.availableTo || '',

        // Amenities
        amenities: [],

        // Images
        image1: null,
        image2: null,
        image3: null,
      },
      schema: Yup.object().shape({
        // Main
        name: Yup.string().required().label('Property Name'),
        monthlyPrice: Yup.number().required().min(0).label('Monthly Price'),
        utilitiesPrice: Yup.number().required().min(0).label('Utilities Price'),
        longitude: Yup.number().required().label('Longitude'),
        latitude: Yup.number().required().label('Latitude'),
        address: Yup.string().required().label('Address'),
        country: Yup.string().required().label('Country'),
        state: Yup.string().required().label('State'),
        city: Yup.string().required().label('City'),
        description: Yup.string().required().label('Description'),

        // Quantities
        houseType: Yup.string().required().nullable().label('House Type'),
        bedrooms: Yup.string().required().nullable().label('Bedrooms'),
        bathrooms: Yup.string().required().nullable().label('Bathrooms'),
        furnishType: Yup.string().required().nullable().label('Furnish Type'),
        size: Yup.number().min(0).required().label('Sqft'),
        availableFrom: Yup.date().required().label('Availability (From)'),
        availableTo: Yup.date()
          .min(Yup.ref('availableFrom'), 'Must not be before Availability (From).')
          .required()
          .label('Availability (To)'),

        // Amenities
        amenities: Yup.array().label('Amenities'),

        // Images
        image1: Yup.mixed()
          .nullable()
          .required('An image is required')
          .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
          .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value && SUPPORTED_IMAGE_UPLOAD_FORMATS.includes(value.type),
          ),
        image2: Yup.mixed()
          .nullable()
          .required('An image is required')
          .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
          .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value && SUPPORTED_IMAGE_UPLOAD_FORMATS.includes(value.type),
          ),
        image3: Yup.mixed()
          .nullable()
          .required('An image is required')
          .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
          .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value && SUPPORTED_IMAGE_UPLOAD_FORMATS.includes(value.type),
          ),
      }),
    }),
    [apartment],
  );
  return (
    <Spinner loadingText={loadingText} isLoading={isLoading}>
      <Formik
        initialValues={getFormDetails().defaultValues}
        validationSchema={getFormDetails().schema}
        onSubmit={async (values) => {
          setIsSubmitting(true);

          // Transform
          values.availableFrom = moment(values.availableFrom).format('YYYY-MM-DD');
          values.availableTo = moment(values.availableTo).format('YYYY-MM-DD');

          await sleep(500);
          setIsSubmitting(false);

          onSubmit(values);
        }}
        enableReinitialize
      >
        {({ errors: formErrors, touched }) => (
          <Form>
            <div className="row">
              <div className="col-12 col-md-4 col-xl-3">
                <PropertyAddQuantities errors={formErrors} touched={touched} />

                <PropertyAddAmenities amenities={amenities} errors={formErrors} touched={touched} />
              </div>
              <div className="col-12 col-md-8 col-xl-9">
                <div className="main-box main-info mt-5 mt-md-0">
                  <div className="header-icon rounded-icon not-responsive">
                    <img src="/images/icon/icon-roof-primary.svg" alt="item icon" />
                  </div>

                  <div className="main-form">
                    <PropertyAddMainDetails
                      errors={formErrors}
                      touched={touched}
                      requestErrors={errors}
                    />

                    <PropertyAddImages errors={formErrors} touched={touched} />

                    <hr className="mt-5 mb-5" />

                    <div className="features">
                      <p className="main-desc font-weight-normal">
                        Sponsor your home to get better results
                      </p>
                      <ul className="mt-3">
                        <li>
                          <p className="item">To get 60% more views on your property</p>
                        </li>
                        <li>
                          <p className="item">Appear as first over other published houses</p>
                        </li>
                        <li>
                          <p className="item">
                            Appear on your homepage where your house is seen by most tenants
                          </p>
                        </li>
                        <li>
                          <p className="item">Extra budget for social media campaign</p>
                        </li>
                        <li>
                          <p className="item">For only €10 per promotion</p>
                        </li>
                      </ul>
                    </div>

                    <Checkbox
                      value={isSponsorChecked}
                      onChange={(value) => setIsSponsorChecked(value)}
                      labelClassNames="text-primary"
                      classNames="mt-5 justify-content-center"
                      label="I would like to sponsor my home to get better results"
                    />

                    <Button type="submit" className="mt-5 d-block mx-auto" loading={isSubmitting}>
                      <span className="font-weight-bold">SAVE </span>AND
                      <span className="font-weight-bold"> POST</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Spinner>
  );
};

export default PropertyAddForm;
