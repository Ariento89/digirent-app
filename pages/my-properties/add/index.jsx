/* eslint-disable react-hooks/exhaustive-deps */
import { useAmenities } from 'hooks/useAmenities';
import { useProperties } from 'hooks/useProperties';
import { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddForm from 'widgets/_PageMyPropertiesAdd/MyPropertiesAddForm';

const Page = () => {
  // STATES
  const [amenities, setAmenities] = useState([]);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const {
    createProperty,
    status: propertiesRequestStatus,
    errors: propertiesRequestErrors,
  } = useProperties();
  const {
    fetchAmenities,
    status: amenitiesRequestStatus,
    errors: amenitiesRequestErrors,
  } = useAmenities();

  // METHODS
  const onFetchAmenitiesSuccess = ({ response }) => {
    setAmenities(
      response.map(({ id, title }) => ({
        id,
        title,
      })),
    );
  };

  useEffect(() => {
    fetchAmenities({
      onSuccess: onFetchAmenitiesSuccess,
      onError: () => setAmenities([]),
    });
  }, []);

  const getLoadingText = useCallback(() => {
    let loadingText = '';

    if (propertiesRequestStatus === request.REQUESTING) {
      loadingText = 'Creating property...';
    } else if (amenitiesRequestStatus === request.REQUESTING) {
      loadingText = 'Fetching amenities...';
    }

    return loadingText;
  }, [propertiesRequestStatus, amenitiesRequestStatus]);

  const isLoading = useCallback(
    () => [propertiesRequestStatus, amenitiesRequestStatus].includes(request.REQUESTING),
    [propertiesRequestStatus, amenitiesRequestStatus],
  );

  const onCreateSuccess = () => {
    addToast('Successfully created property.', toastTypes.SUCCESS);
  };

  const onCreateError = () => {
    addToast('An error occurred while creating your property.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    createProperty(data, {
      onSuccess: onCreateSuccess,
      onError: onCreateError,
    });
  };

  return (
    <PageWrapper title="DigiRent - Add Property" pageName="my-properties-add">
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

        <MyPropertiesAddForm
          amenities={amenities}
          property={null}
          onSubmit={onSubmit}
          isLoading={isLoading()}
          loadingText={getLoadingText()}
          errors={[...propertiesRequestErrors, ...amenitiesRequestErrors]}
        />
      </div>
    </PageWrapper>
  );
};

export default Page;
