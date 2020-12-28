/* eslint-disable react-hooks/exhaustive-deps */
import LoadingPage from 'components/LoadingPage/index';
import { types } from 'ducks/apartments';
import { useAmenities } from 'hooks/useAmenities';
import { useApartments } from 'hooks/useApartments';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddForm from 'widgets/_PageMyPropertiesAdd/MyPropertiesAddForm';

const Page = () => {
  // STATES
  const [apartment, setApartment] = useState(null);
  const [amenities, setAmenities] = useState([]);

  // CUSTOM HOOKS
  const router = useRouter();
  const { id: apartmentId } = router.query;
  const { addToast } = useToasts();
  const {
    getApartment,
    updateApartment,
    status: apartmentsRequestStatus,
    errors: apartmentsRequestErrors,
    recentRequest: apartmentsRecentRequest,
  } = useApartments();
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

  const onGetApartmentSuccess = ({ response }) => {
    setApartment(response);
  };

  const onGetApartmentError = () => {
    router.replace('/404');
  };

  useEffect(() => {
    fetchAmenities({
      onSuccess: onFetchAmenitiesSuccess,
      onError: () => setAmenities([]),
    });
  }, []);

  useEffect(() => {
    if (apartmentId) {
      getApartment(
        { apartmentId },
        {
          onSuccess: onGetApartmentSuccess,
          onError: onGetApartmentError,
        },
      );
    }
  }, [apartmentId]);

  const getLoadingText = useCallback(() => {
    let loadingText = '';

    if (apartmentsRequestStatus === request.REQUESTING) {
      if (apartmentsRecentRequest === types.UPDATE_APARTMENT) {
        loadingText = 'Updating apartment...';
      } else if (apartmentsRecentRequest === types.GET_APARTMENT) {
        loadingText = 'Fetching apartment...';
      }
    } else if (amenitiesRequestStatus === request.REQUESTING) {
      loadingText = 'Fetching amenities...';
    }

    return loadingText;
  }, [apartmentsRequestStatus, apartmentsRecentRequest, amenitiesRequestStatus]);

  const isLoading = useCallback(
    () => [apartmentsRequestStatus, amenitiesRequestStatus].includes(request.REQUESTING),
    [apartmentsRequestStatus, amenitiesRequestStatus],
  );

  const onUpdateSuccess = () => {
    addToast('Successfully updated apartment.', toastTypes.SUCCESS);
  };

  const onUpdateError = () => {
    addToast('An error occurred while updating your apartment.', toastTypes.ERROR);
  };

  const onSubmit = (data) => {
    updateApartment(
      { apartmentId, ...data },
      {
        onSuccess: onUpdateSuccess,
        onError: onUpdateError,
      },
    );
  };

  return apartment ? (
    <PageWrapper title="DigiRent - Update Property" pageName="property-add">
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
          apartment={apartment}
          onSubmit={onSubmit}
          isLoading={isLoading()}
          loadingText={getLoadingText()}
          errors={[...apartmentsRequestErrors, ...amenitiesRequestErrors]}
        />
      </div>
    </PageWrapper>
  ) : (
    <LoadingPage />
  );
};

export default Page;
