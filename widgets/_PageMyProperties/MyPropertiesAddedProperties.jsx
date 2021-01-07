import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { request } from 'shared/types';
import StateList, { StateListTypes } from 'widgets/StateList/index';
import PropertyInfo from 'widgets/PropertyInfo/index';

const MyPropertiesAddedProperties = ({
  properties,
  status,
  errors,
  onViewApplications,
  onDeleteProperty,
}) => (
  <div className="container added-properties">
    <Spinner loadingText="Fetching properties..." isLoading={status === request.REQUESTING}>
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
              buttonName="VIEW APPLICATIONS"
              onClick={() => onViewApplications(property)}
              onDelete={onDeleteProperty}
              selectionType={null}
            />
          </div>
        ))}

        {/* EMPTY LIST */}
        {status === request.SUCCESS && properties?.length === 0 && (
          <StateList
            className="mx-auto"
            title="EMPTY LIST"
            description="You have not added properties yet."
            type={StateListTypes.EMPTY}
          />
        )}

        {/* ERROR LIST */}
        {status === request.ERROR && (
          <StateList
            className="mx-auto"
            title="OOPS!"
            description="An error ocurred while fetching your properties."
            type={StateListTypes.ERROR}
          />
        )}
      </div>
    </Spinner>
  </div>
);

export default MyPropertiesAddedProperties;
