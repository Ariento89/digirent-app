import Button from 'components/Button/index';
import Checkbox from 'components/Checkbox/index';
import Spinner from 'components/Spinner/index';
import { Form, Formik } from 'formik';
import { useApartments } from 'hooks/useApartments';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { sleep } from 'shared/functions';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import PropertyAddAmenities from 'widgets/_PagePropertyAdd/PropertyAddAmenities';
import PropertyAddImages from 'widgets/_PagePropertyAdd/PropertyAddImages';
import PropertyAddMainDetails from 'widgets/_PagePropertyAdd/PropertyAddMainDetails';
import PropertyAddQuantities from 'widgets/_PagePropertyAdd/PropertyAddQuantities';
import * as Yup from 'yup';

const amenities = [
  { key: 'pool', label: 'Pool' },
  { key: 'elevator', label: 'Elevator' },
  { key: 'deck', label: 'Deck' },
  { key: 'gym', label: 'Gym' },
  { key: 'fireplace', label: 'Fireplace' },
  { key: 'dishwasher', label: 'Dishwasher' },
  { key: 'wheelchair', label: 'Wheelchair' },
  { key: 'non_smoking', label: 'Non smoking' },
  { key: 'dogs_allowed', label: 'Dogs Allowed' },
  { key: 'cats_allowed', label: 'Cats Allowed' },
  { key: 'no_pets', label: 'No Pets' },
];

const Page = () => {
  // STATES
  const [isSponsorChecked, setIsSponsorChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { createApartment, updateApartment, status, errors } = useApartments();

  // METHODS
  const getFormDetails = useCallback(
    () => ({
      defaultValues: {
        // Main
        name: '',
        monthlyPrice: '',
        utilitiesPrice: '',
        securityDeposit: '',
        address: '',
        country: '',
        state: '',
        city: '',
        description: '',

        // Quantities
        houseType: null,
        bedrooms: null,
        bathrooms: null,
        furnishType: null,
        sqft: '',
        availabilityFrom: '',
        availabilityTo: '',

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
        securityDeposit: Yup.number().required().min(0).label('Security Deposit'),
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
        sqft: Yup.number().min(0).required().label('Sqft'),
        availabilityFrom: Yup.date().required().label('Availability (From)'),
        availabilityTo: Yup.date()
          .min(Yup.ref('availabilityFrom'), 'Must not be before Availability (From).')
          .required()
          .label('Availability (To)'),

        // Amenities
        amenities: Yup.array().label('Amenities'),

        // Images
        // image1: Yup.mixed()
        //   .nullable()
        //   .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
        //   .test(
        //     'fileFormat',
        //     'Unsupported Format',
        //     (value) => value && SUPPORTED_IMAGE_UPLOAD_FORMATS.includes(value.type),
        //   ),
        // image2: Yup.mixed()
        //   .nullable()
        //   .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
        //   .test(
        //     'fileFormat',
        //     'Unsupported Format',
        //     (value) => value && SUPPORTED_IMAGE_UPLOAD_FORMATS.includes(value.type),
        //   ),
        // image3: Yup.mixed()
        //   .nullable()
        //   .test('fileSize', 'File too large', (value) => value && value.size <= MAX_FILE_SIZE)
        //   .test(
        //     'fileFormat',
        //     'Unsupported Format',
        //     (value) => value && SUPPORTED_IMAGE_UPLOAD_FORMATS.includes(value.type),
        //   ),
      }),
    }),
    [],
  );

  // useEffect(() => {
  //   let data = {};
  //   amenities.forEach(({ key }) => {
  //     data[key] = false;
  //   });
  //   setAmenitiesValue(data);

  //   data = {};
  //   otherAmenities.forEach(({ key }) => {
  //     data[key] = false;
  //   });
  //   setMoreAmenitiesValue(data);
  // }, []);

  const onCreateSuccess = () => {
    addToast('Successfully created apartment.', toastTypes.SUCCESS);
  };

  const onCreateError = () => {
    addToast('An error occurred while creating your apartment.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    console.log(data);

    createApartment(data, {
      onSuccess: onCreateSuccess,
      onError: onCreateError,
    });
  };

  return (
    <PageWrapper title="DigiRent - Property" pageName="property-add">
      <img src="/images/add-property-bg.jpg" className="main-background" alt="background" />

      <div className="container-lg mt-5">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3" />
          <div className="col-12 col-md-8 col-xl-9">
            <p className="main-info-title text-white font-weight-bold">
              <span className="alt text-primary font-weight-light">ADD</span>
              <br />
              PROPERTY
            </p>
          </div>
        </div>

        <Spinner loadingText="Creating apartment..." isLoading>
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
                <div className="row">
                  <div className="col-12 col-md-4 col-xl-3">
                    <PropertyAddQuantities errors={formErrors} touched={touched} />

                    <PropertyAddAmenities
                      amenities={amenities}
                      errors={formErrors}
                      touched={touched}
                    />
                  </div>
                  <div className="col-12 col-md-8 col-xl-9">
                    <div className="main-box main-info mt-5 mt-md-0">
                      <div className="header-icon rounded-icon not-responsive">
                        <img src="/images/icon/icon-roof-primary.svg" alt="item icon" />
                      </div>

                      <div className="main-form">
                        <PropertyAddMainDetails errors={formErrors} touched={touched} />

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

                        <Button
                          type="submit"
                          className="mt-5 d-block mx-auto"
                          loading={isSubmitting}
                        >
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
      </div>
    </PageWrapper>
  );
};

export default Page;
