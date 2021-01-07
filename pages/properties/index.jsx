/* eslint-disable react-hooks/exhaustive-deps */
import { useProperties } from 'hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesLanding from 'widgets/_PageProperties/PropertiesLanding';
import PropertiesRecommended from 'widgets/_PageProperties/PropertiesRecommended';
import PropertiesSearchResult from 'widgets/_PageProperties/PropertiesSearchResult';

const Page = () => {
  // STATES
  const [properties, setProperties] = useState([]);
  const searchResultRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();

  // METHODS
  const onFetchSuccess = ({ response }) => {
    setProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while searching properties.', toastTypes.ERROR);
  };

  const onSearch = (data) => {
    if (data !== null) {
      searchResultRef.current.scrollIntoView();
    }

    fetchProperties(data, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  };

  useEffect(() => {
    onSearch(null);
  }, []);

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
      />

      <PropertiesRecommended />
    </PageWrapper>
  );
};

export default Page;
