/* eslint-disable react-hooks/exhaustive-deps */
import { useProperties } from 'hooks/useProperties';
import { useMe } from 'hooks/useMe';
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesLanding from 'widgets/_PageProperties/PropertiesLanding';
import PropertiesRecommended from 'widgets/_PageProperties/PropertiesRecommended';
import PropertiesSearchResult from 'widgets/_PageProperties/PropertiesSearchResult';
import { withRouter } from 'next/router';

const Page = ({ router }) => {
  console.log('entered properties page');
  // STATES
  const [properties, setProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  // REFS
  const searchResultRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();
  const { me } = useMe();
  const params = {};

  // METHODS
  useEffect(() => {
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
  }, [me]);

  const onSearch = (data) => {
    if (data !== null) {
      searchResultRef.current.scrollIntoView();
    }
    
    if (me && me.role === 'tenant') {
      fetchProperties({...data, isTenant: true}, {
        onSuccess: onFetchSuccess,
        onError: onFetchError,
      });
    } else {
      fetchProperties(data, {
        onSuccess: onFetchSuccess,
        onError: onFetchError,
      });
    }
  };

  const onFetchSuccess = ({ response }) => {
    console.log('fetchsccessul');
    console.log('my searches here', response);
    if (!recommendedProperties.length) {
      setRecommendedProperties(response);
    }

    console.log('returning your response');
    setProperties(response);
    console.log('my searches here 3', response);
  };

  const onFetchError = () => {
    addToast('An error occurred while searching properties.', toastTypes.ERROR);
  };

  const onFiltersChanged = (filterObject) => {
    // console.log(filterObject.min_price);
    // params.min_price = filterObject.min_price;
    // params.max_price = filterObject.max_price;
    // params.available_from = filterObject.available_from;
    // params.available_to = filterObject.available_to;
    // params.house_type = filterObject.house_type;
    // params.max_bathrooms = filterObject.max_bathrooms;
    // params.min_bathrooms = filterObject.min_bathrooms;
    // params.max_bedrooms = filterObject.max_bedrooms;
    // params.min_bedrooms = filterObject.min_bedrooms;
    // params.lat = filterObject.lat;
    // params.lng = filterObject.lng;

    // testing
    console.log('API sent', filterObject);

    onSearch(filterObject);
  };

  return (
    <PageWrapper title="DigiRent - Properties" pageName="properties">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

      {/* <PropertiesLanding onSubmit={onSearch} /> */}
      <PropertiesSearchResult
        searchResultRef={searchResultRef}
        properties={properties}
        status={status}
        errors={errors}
        location={router.query.label}
        onFiltersChanged={onFiltersChanged}
      />

      <PropertiesRecommended properties={recommendedProperties} />
    </PageWrapper>
  );
};

export default withRouter(Page);
