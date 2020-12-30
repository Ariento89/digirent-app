import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import PropertyInfo from 'widgets/PropertyInfo/index';

const MyPropertiesAddedProperties = ({
  properties,
  loading,
  errors,
  onSeeReaction,
  onDeleteProperty,
}) => (
  <div className="container added-properties">
    <Spinner loadingText="Fetching properties..." isLoading={loading}>
      <h3 className="main-title">
        ADDED <span className="text-primary font-weight-bold">PROPERTIES</span>
      </h3>

      {!!errors?.length && errors?.map((error) => <FieldError key={error} error={error} />)}

      <div className="row properties">
        {properties.map((property) => (
          <div key={property.id} className="col-12 col-md-6 col-xl-4">
            <PropertyInfo
              link={`my-properties/update/${property.id}`}
              houseImage="/images/house-sample-1.jpg"
              name={property.name}
              address={property.address}
              rentFee={property.monthlyPrice}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              buttonName="SEE APPLICATIONS"
              onClick={() => onSeeReaction(property)}
              onDelete={onDeleteProperty}
              selectionType={null}
            />
          </div>
        ))}
      </div>
    </Spinner>
  </div>
);

export default MyPropertiesAddedProperties;
