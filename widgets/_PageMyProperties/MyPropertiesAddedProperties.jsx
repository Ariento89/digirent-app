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
          <div key={property.apartment.id} className="col-12 col-md-6 col-xl-4 my-properties-property">
            <PropertyInfo
              link={`my-properties/update/${property.apartment.id}`}
              houseImage={
                property.apartment.images && property.apartment.images.length > 0
                  ? `${API_ASSET_URL}${property.apartment.images[0]}`
                  : '"/images/house-sample-2.jpg"'
              }
              name={property.apartment.name}
              address={property.apartment.address}
              rentFee={property.apartment.monthlyPrice}
              bedrooms={property.apartment.bedrooms}
              bathrooms={property.apartment.bathrooms}
              buttonName="VIEW APPLICATIONS"
              onClick={() => onViewApplications(property.apartment)}
              onDelete={() => onDeleteProperty(property.apartment)}
              selectionType={null}
              propId={property.apartment.id}
              context={property.context}
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
