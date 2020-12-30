/* eslint-disable react-hooks/exhaustive-deps */
import LoadingPage from 'components/LoadingPage/index';
import { types } from 'ducks/properties';
import { useAmenities } from 'hooks/useAmenities';
import { useProperties } from 'hooks/useProperties';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddForm from 'widgets/_PageMyPropertiesAdd/MyPropertiesAddForm';

const Page = () => {
  // STATES
  const [property, setProperty] = useState(null);
  const [amenities, setAmenities] = useState([]);

  // CUSTOM HOOKS
  const router = useRouter();
  const { id: propertyId } = router.query;
  const { addToast } = useToasts();
  const {
    getProperty,
    updateProperty,
    status: propertiesRequestStatus,
    errors: propertiesRequestErrors,
    recentRequest: propertiesRecentRequest,
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

  const onGetPropertySuccess = ({ response }) => {
    setProperty(response);
  };

  const onGetPropertyError = () => {
    router.replace('/404');
  };

  useEffect(() => {
    fetchAmenities({
      onSuccess: onFetchAmenitiesSuccess,
      onError: () => setAmenities([]),
    });
  }, []);

  useEffect(() => {
    if (propertyId) {
      getProperty(
        { propertyId },
        {
          onSuccess: onGetPropertySuccess,
          onError: onGetPropertyError,
        },
      );
    }
  }, [propertyId]);

  const getLoadingText = useCallback(() => {
    let loadingText = '';

    if (propertiesRequestStatus === request.REQUESTING) {
      if (propertiesRecentRequest === types.UPDATE_PROPERTY) {
        loadingText = 'Updating property...';
      } else if (propertiesRecentRequest === types.GET_PROPERTY) {
        loadingText = 'Fetching property...';
      }
    } else if (amenitiesRequestStatus === request.REQUESTING) {
      loadingText = 'Fetching amenities...';
    }

    return loadingText;
  }, [propertiesRequestStatus, propertiesRecentRequest, amenitiesRequestStatus]);

  const isLoading = useCallback(
    () => [propertiesRequestStatus, amenitiesRequestStatus].includes(request.REQUESTING),
    [propertiesRequestStatus, amenitiesRequestStatus],
  );

  const onUpdateSuccess = () => {
    addToast('Successfully updated property.', toastTypes.SUCCESS);
  };

  const onUpdateError = () => {
    addToast('An error occurred while updating your property.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    updateProperty(
      { propertyId, ...data },
      {
        onSuccess: onUpdateSuccess,
        onError: onUpdateError,
      },
    );
  };

  return property ? (
    <PageWrapper title="DigiRent - Update Property" pageName="my-properties-add">
      <img src="/images/add-property-bg.jpg" className="main-background" alt="background" />

      <div className="container-lg mt-5">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3" />
          <div className="col-12 col-md-8 col-xl-9">
            <p className="main-info-title text-white font-weight-bold">
              <span className="alt text-primary font-weight-light">UPDATE</span>
              <br />
              PROPERTY
            </p>
          </div>
        </div>

        <MyPropertiesAddForm
          amenities={amenities}
          property={property}
          onSubmit={onSubmit}
          isLoading={isLoading()}
          loadingText={getLoadingText()}
          errors={[...propertiesRequestErrors, ...amenitiesRequestErrors]}
        />
      </div>
    </PageWrapper>
  ) : (
    <LoadingPage />
  );
};

export default Page;
