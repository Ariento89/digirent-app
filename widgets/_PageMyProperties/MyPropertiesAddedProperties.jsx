import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { request } from 'shared/types';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import PropertyInfo from 'widgets/PropertyInfo/index';
import { API_ASSET_URL } from 'services/index';

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
              houseImage={
                property.images && property.images.length > 0
                  ? `${API_ASSET_URL}${property.images[0]}`
                  : '"/images/house-sample-2.jpg"'
              }
              name={property.name}
              address={property.address}
              rentFee={property.monthlyPrice}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              buttonName="VIEW APPLICATIONS"
              onClick={() => onViewApplications(property)}
              onDelete={() => onDeleteProperty(property)}
              selectionType={null}
              propId={property.id}
            />
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {status === request.SUCCESS && !properties?.length && (
        <StateList
          className="mx-auto"
          title="LIST IS EMPTY"
          description="You have not added properties yet."
          type={stateListTypes.EMPTY}
        />
      )}

      {/* ERROR */}
      {status === request.ERROR && (
        <StateList
          className="mx-auto"
          title="OOPS!"
          description="An error ocurred while fetching your properties."
          type={stateListTypes.ERROR}
        />
      )}
    </Spinner>
  </div>
);

export default MyPropertiesAddedProperties;
