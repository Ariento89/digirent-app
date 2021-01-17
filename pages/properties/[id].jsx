/* eslint-disable react-hooks/exhaustive-deps */
import LoadingPage from 'components/LoadingPage/index';
import { useProperties } from 'hooks/useProperties';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesDetailsMain from 'widgets/_PagePropertiesDetails/PropertiesDetailsMain';
import PropertiesDetailsRecentlyViewedProperties from 'widgets/_PagePropertiesDetails/PropertiesDetailsRecentlyViewedProperties';

const Page = () => {
  // STATES
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState(null);

  // CUSTOM HOOKS
  const router = useRouter();
  const { id: propertyId } = router.query;
  const { getProperty, status: getPropertyStatus } = useProperties();
  const { fetchProperties, status: fetchPropertiesStatus } = useProperties();
  console.log('propertyId', propertyId);
  // METHODS
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

    fetchProperties(null, {
      onSuccess: onFetchPropertiesSuccess,
    });
  }, [propertyId]);

  const onGetPropertySuccess = ({ response }) => {
    setProperty(response);
  };

  const onGetPropertyError = () => {
    router.replace('/404');
  };

  const onFetchPropertiesSuccess = ({ response }) => {
    setProperties(response.slice(0, 5));
  };

  return property ? (
    <PageWrapper title="DigiRent - Property Details" pageName="property-details">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

      <PropertiesDetailsMain property={property} status={getPropertyStatus} />
      <PropertiesDetailsRecentlyViewedProperties
        properties={properties}
        status={fetchPropertiesStatus}
      />
    </PageWrapper>
  ) : (
    <LoadingPage />
  );
};

export default Page;
