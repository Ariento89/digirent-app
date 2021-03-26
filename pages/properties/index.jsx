/* eslint-disable react-hooks/exhaustive-deps */
import { useProperties } from 'hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesLanding from 'widgets/_PageProperties/PropertiesLanding';
import PropertiesRecommended from 'widgets/_PageProperties/PropertiesRecommended';
import PropertiesSearchResult from 'widgets/_PageProperties/PropertiesSearchResult';
import { withRouter } from 'next/router';

const Page = ({ router }) => {
  // STATES
  const [properties, setProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  // REFS
  const searchResultRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();

  // METHODS

  useEffect(() => {
    const params = {};
    if (router.query.from) {
      params.available_from = router.query.from;
    }
    if (router.query.to) {
      params.available_to = router.query.to;
    }
    if (router.query.lat !== '0') {
      params.latitude = router.query.lat;
    }
    if (router.query.lng !== '0') {
      params.longitude = router.query.lng;
    }

    onSearch(params);
  }, []);

  const onSearch = (data) => {
    if (data !== null) {
      searchResultRef.current.scrollIntoView();
    }

    fetchProperties(data, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  };

  const onFetchSuccess = ({ response }) => {
    if (!recommendedProperties.length) {
      setRecommendedProperties(response);
    }

    setProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while searching properties.', toastTypes.ERROR);
  };

  return (
    <PageWrapper title="DigiRent - Properties" pageName="properties">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

      <PropertiesLanding onSubmit={onSearch} />

      <PropertiesSearchResult
        searchResultRef={searchResultRef}
        properties={properties}
        status={status}
        errors={errors}
        location={router.query.label}
      />

      <PropertiesRecommended properties={recommendedProperties} />
    </PageWrapper>
  );
};

export default withRouter(Page);
