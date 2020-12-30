/* eslint-disable react-hooks/exhaustive-deps */
import LoadingPage from 'components/LoadingPage/index';
import { useProperties } from 'hooks/useProperties';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesDetailsMain from 'widgets/_PagePropertiesDetails/PropertiesDetailsMain';
import PropertiesDetailsRecentlyViewed from 'widgets/_PagePropertiesDetails/PropertiesDetailsRecentlyViewed';

const Page = () => {
  // STATES
  const [property, setProperty] = useState(null);

  // CUSTOM HOOKS
  const router = useRouter();
  const { id: propertyId } = router.query;
  const { getProperty } = useProperties();

  // METHODS
  const onGetPropertySuccess = ({ response }) => {
    setProperty(response);
  };

  const onGetPropertyError = () => {
    router.replace('/404');
  };

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

  return property ? (
    <PageWrapper title="DigiRent - Property Details" pageName="property-details">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

      <PropertiesDetailsMain property={property} />
      <PropertiesDetailsRecentlyViewed />
    </PageWrapper>
  ) : (
    <LoadingPage />
  );
};

export default Page;
