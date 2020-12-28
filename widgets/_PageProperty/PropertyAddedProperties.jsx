/* eslint-disable react-hooks/exhaustive-deps */
import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { useApartments } from 'hooks/useApartments';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import PropertyInfo from 'widgets/PropertyInfo/index';

const PropertyAddedProperties = ({ onSeeReaction, onDeleteProperty }) => {
  // STATES
  const [addedProperties, setAddedProperties] = useState([]);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchApartments, status, errors } = useApartments();

  // METHODS
  const onFetchSuccess = ({ response }) => {
    setAddedProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while fetching properties.', toastTypes.ERROR);
  };

  useEffect(() => {
    fetchApartments(
      {},
      {
        onSuccess: onFetchSuccess,
        onError: onFetchError,
      },
    );
  }, []);

  return (
    <div className="container added-properties">
      <Spinner loadingText="Fetching properties..." isLoading={status === request.REQUESTING}>
        <h3 className="main-title">
          ADDED <span className="text-primary font-weight-bold">PROPERTIES</span>
        </h3>

        {!!errors?.length && errors?.map((error) => <FieldError key={error} error={error} />)}

        <div className="row properties">
          {addedProperties.map((property) => (
            <div key={property.id} className="col-12 col-md-6 col-xl-4">
              <PropertyInfo
                houseImage="/images/house-sample-1.jpg"
                name={property.name}
                address={property.address}
                rentFee={property.monthlyPrice}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                buttonName="SEE REACTIONS"
                onClick={onSeeReaction}
                onDelete={onDeleteProperty}
                selectionType={null}
              />
            </div>
          ))}
        </div>
      </Spinner>
    </div>
  );
};

export default PropertyAddedProperties;
