/* eslint-disable operator-linebreak */
import AutoFillField from 'components/AutoFillField/index';
import FieldError from 'components/FieldError/FieldError';
import FormInputIcon from 'components/FormInputIcon/index';
import FormTextarea from 'components/FormTextarea/index';
import { Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
// import AutoFillField from 'components/AutoFillField/index';
import MapPicker from './MapPicker';

const MyPropertiesAddMainDetails = ({ property, errors, touched, requestErrors }) => {
  const { setFieldValue } = useFormikContext();
  console.log(property);

  useEffect(() => {
    if (property !== null) {
      setFieldValue('latitude', property.latitude);
      setFieldValue('longitude', property.longitude);
      setFieldValue('address', property.address);

      setFieldValue('country', 'Netherlands');
      // setFieldValue('state', property.state);
      // setFieldValue('city', property.city);
    }
  }, [property]);

  return (
    <>
      {!!requestErrors?.length &&
        requestErrors?.map((error) => <FieldError key={error} error={error} />)}
      <div className="row mt-3">
        {/* 1st row */}
        <div className="col-12">
          <FormInputIcon name="name" placeholder="Property Name" icon="icon-user-primary" />
          {errors.name && touched.name ? <FieldError error={errors.name} /> : null}
        </div>

        {/* 2nd row */}
        <div className="col-lg-6 mt-4">
          <FormInputIcon
            type="number"
            name="monthlyPrice"
            placeholder="Monthly Price"
            icon="icon-euro-primary"
          />
          {errors.monthlyPrice && touched.monthlyPrice ? (
            <FieldError error={errors.monthlyPrice} />
          ) : null}
        </div>
        <div className="col-lg-6 mt-4">
          <FormInputIcon
            type="number"
            name="utilitiesPrice"
            placeholder="Utilities Price"
            icon="icon-euro-primary"
          />
          {errors.utilitiesPrice && touched.utilitiesPrice ? (
            <FieldError error={errors.utilitiesPrice} />
          ) : null}
        </div>

        {/* 3rd row */}

        {/* <div className="col-lg-6 mt-4">
          <FormInputIcon
            type="number"
            name="longitude"
            placeholder="Longitude"
            icon="icon-map-marker-coordinate-primary"
          />
          <input type="hidden" value="1" name="longitude" />
          {errors.longitude && touched.longitude ? <FieldError error={errors.longitude} /> : null}
        </div>
        <div className="col-lg-6 mt-4">
          <FormInputIcon
            type="number"
            name="latitude"
            placeholder="Latitude"
            icon="icon-map-marker-coordinate-primary"
          />
          <input type="hidden" value="2" name="latitude" />
          <Field type="hidden" value="2" name="latitude" />
          {errors.latitude && touched.latitude ? <FieldError error={errors.latitude} /> : null}
        </div> */}

        {/* 4th row (Temporary, until autofill field is fixed) */}

        {/* <div className="col-lg-12 mt-4">
          <FormInputIcon
            name="address"
            placeholder="Address"
            icon="icon-map-marker-coordinate-primary"
          />
          {errors.address && touched.address ? <FieldError error={errors.address} /> : null}
        </div> */}

        {/* 4th row */}
        <div className="col-lg-12 mt-4">
          <AutoFillField
            types={['address']}
            placeholderColor="#d0d3d4"
            height="40px"
            width="100%"
            placeholder={property?.address ?? 'Address'}
            icon="icon-map-marker-primary"
            selected={(label, lat, lng, value, terms) => {
              setFieldValue('latitude', lat);
              setFieldValue('longitude', lng);
              setFieldValue('address', value);

              setFieldValue('country', 'Netherlands');
              setFieldValue('state', terms[0]?.value ?? 'none');
              setFieldValue('city', terms[1]?.value ?? 'none');
            }}
          />
          {errors.address && touched.address ? <FieldError error={errors.address} /> : null}
        </div>

        {/* 5th row */}
        {/* <div className="col-lg-4 mt-4">
          <FormInputIcon
            classNames="field-item small-icon"
            name="country"
            placeholder="Country"
            icon="icon-circle-primary"
          />
          {errors.country && touched.country ? <FieldError error={errors.country} /> : null}
        </div>
        <div className="col-lg-4 mt-4">
          <FormInputIcon
            classNames="field-item small-icon"
            name="state"
            placeholder="State"
            icon="icon-circle-primary"
          />
          {errors.state && touched.state ? <FieldError error={errors.state} /> : null}
        </div>
        <div className="col-lg-4 mt-4">
          <FormInputIcon
            classNames="field-item small-icon"
            name="city"
            placeholder="City"
            icon="icon-circle-primary"
          />
          {errors.city && touched.city ? <FieldError error={errors.city} /> : null}
        </div> */}

        {/* <div className="col-12">
          {errors.longitude && touched.longitude ? <FieldError error="Location is required" /> : null}
          <MapPicker
            lat={52.0057441}
            lng={5.7565194}
            setFieldValue={setFieldValue}
            onPick={(lat, lng) => {
              setFieldValue('latitude', lat);
              setFieldValue('longitude', lng);
            }}
          />
        </div> */}

        {/* 6th row */}
        <div className="col-lg-12 mt-4">
          <FormTextarea
            name="description"
            placeholder="Description"
            icon="icon-left-align-primary"
          />
          {errors.description && touched.description ? (
            <FieldError error={errors.description} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MyPropertiesAddMainDetails;
