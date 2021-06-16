/* eslint-disable react-hooks/exhaustive-deps */
import { useProperties } from 'hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import PropertiesRecommended from 'widgets/_PageProperties/PropertiesRecommended';
import PropertiesSearchResult from 'widgets/_PageProperties/PropertiesSearchResult';
import { withRouter } from 'next/router';

const Page = ({ router }) => {
  console.log("search page")
  // STATES
  const [properties, setProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);


  // REFS
  const searchResultRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();
  console.log("--------------------------")

    const params = {};

  // METHODS
  useEffect(() => {
    console.log("create params")

    if (router.query.from) {
      params.available_from = router.query.from;
      // console.log("from within properties")
    }
    if (router.query.to) {
      params.available_to = router.query.to;
      // console.log(params)
    }
    if (router.query.mp) {
      params.min_price = router.query.mp;
    }
    if (router.query.max_price) {
      params.max_price = router.query.max_price;
    }
    if (router.query.housetype) {
      params.house_type = router.query.housetype;
    }
    if (router.query.max_bathrooms) {
      params.max_bathrooms = router.query.max_bathrooms;
    }
    if (router.query.max_bedrooms) {
      params.max_bedrooms = router.query.max_bedrooms;
    }
    if (router.query.min_bathrooms) {
      params.min_bathrooms = router.query.min_bathrooms;
    }
    if (router.query.min_bedrooms) {
      params.min_bedrooms = router.query.min_bedrooms;
    }
    if (router.query.lat !== '0') {
      params.latitude = router.query.lat;
    }
    if (router.query.lng !== '0') {
      params.longitude = router.query.lng;
    }

    onSearch(params);
    // par = params;
  });

  // search from properties filter page
  const onNewSearch = (data) => {
    console.log('Here');
    onSearch(data);
  };

  const onSearch = (data) => {
    console.log("searching")
    if (data !== null) {
      console.log("there is data so top of the page")
      searchResultRef.current.scrollIntoView();
    }

    console.log("fetching properties")
    fetchProperties(data, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  };

  const onFetchSuccess = ({ response }) => {
    console.log("query fetch data successful")
    if (!recommendedProperties.length) {
      setRecommendedProperties(response);
    }

    console.log("search data")
    setProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while searching properties.', toastTypes.ERROR);
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
        onNewSearch={(data) => onNewSearch(data)}
      />

      {/* <PropertiesSearchResult
        f = {router.query.from}
        tr = {router.query.to}
        location={router.query.label}
            
      /> */}

      
      <PropertiesRecommended properties={recommendedProperties} /> 
    </PageWrapper>
  );
};

export default withRouter(Page);
