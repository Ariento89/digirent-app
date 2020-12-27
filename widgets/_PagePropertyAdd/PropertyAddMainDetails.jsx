import FieldError from 'components/FieldError/FieldError';
import FormInputIcon from 'components/FormInputIcon/index';
import FormTextarea from 'components/FormTextarea/index';

const PropertyAddMainDetails = ({ errors, touched }) => (
  <div className="row">
    {/* 1st row */}
    <div className="col-12">
      <FormInputIcon name="name" placeholder="Property Name" icon="icon-user-primary" />
      {errors.name && touched.name ? <FieldError error={errors.name} /> : null}
    </div>

    {/* 2nd row */}
    <div className="col-lg-4 mt-4">
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
    <div className="col-lg-4 mt-4">
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
    <div className="col-lg-4 mt-4">
      <FormInputIcon
        type="number"
        name="securityDeposit"
        placeholder="Security Deposit"
        icon="icon-security-primary"
      />
      <span className="d-block font-weight-light text-primary small mt-1">
        In your local currency
      </span>
      {errors.securityDeposit && touched.securityDeposit ? (
        <FieldError error={errors.securityDeposit} />
      ) : null}
    </div>

    {/* 3rd row */}
    <div className="col-lg-12 mt-4">
      <FormInputIcon name="address" placeholder="Address" icon="icon-map-marker-primary" />
      {errors.address && touched.address ? <FieldError error={errors.address} /> : null}
    </div>

    {/* 4th row */}
    <div className="col-lg-4 mt-4">
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
    </div>

    {/* 5th row */}
    <div className="col-lg-12 mt-4">
      <FormTextarea name="description" placeholder="Description" icon="icon-left-align-primary" />
      {errors.description && touched.description ? <FieldError error={errors.description} /> : null}
    </div>
  </div>
);

export default PropertyAddMainDetails;
