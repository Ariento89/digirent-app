/* eslint-disable react-hooks/exhaustive-deps */
import LoadingPage from 'components/LoadingPage/index';
import { useApartments } from 'hooks/useApartments';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesDetailsMain from 'widgets/_PagePropertiesDetails/PropertiesDetailsMain';
import PropertiesDetailsRecentlyViewed from 'widgets/_PagePropertiesDetails/PropertiesDetailsRecentlyViewed';

const Page = () => {
  // STATES
  const [apartment, setApartment] = useState(null);

  // CUSTOM HOOKS
  const router = useRouter();
  const { id: apartmentId } = router.query;
  const { getApartment } = useApartments();

  // METHODS
  const onGetApartmentSuccess = ({ response }) => {
    setApartment(response);
  };

  const onGetApartmentError = () => {
    router.replace('/404');
  };

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

  return apartment ? (
    <PageWrapper title="DigiRent - Property Details" pageName="property-details">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

      <PropertiesDetailsMain apartment={apartment} />
      <PropertiesDetailsRecentlyViewed />
    </PageWrapper>
  ) : (
    <LoadingPage />
  );
};

export default Page;
