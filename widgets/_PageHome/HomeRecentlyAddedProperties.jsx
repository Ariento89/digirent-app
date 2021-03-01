/* eslint-disable react-hooks/exhaustive-deps */
import { NextArrow, PrevArrow } from 'components/SlickArrows';
import { useProperties } from 'hooks/useProperties';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { request } from 'shared/types';
import PropertyInfo from 'widgets/PropertyInfo/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import { API_ASSET_URL } from 'services/index';

const propertiesSlickSettings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  swipe: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        dots: true,
        swipe: true,
        slidesToShow: 1,
      },
    },
  ],
};

const HomeRecentlyAddedProperties = () => {
  // STATES
  const [properties, setProperties] = useState([]);

  // CUSTOM HOOKS
  const { fetchProperties, status } = useProperties();

  // METHODS
  useEffect(() => {
    fetchProperties(null, {
      onSuccess: onFetchSuccess,
    });
  }, []);

  const onFetchSuccess = ({ response }) => {
    setProperties(response);
  };

  return (
    <div className="recently-added-properties container">
      <h3 className="main-title">
        RECENTLY ADDED <span className="text-primary font-weight-bold">PROPERTIES</span>
      </h3>
      <p className="main-subtitle mt-1 mt-md-4 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

      {status === request.SUCCESS && !!properties.length && (
        <Slider {...propertiesSlickSettings} className="properties">
          {properties.map((property) => (
            <div key={property.id} className="item">
              <PropertyInfo
                link={`/properties/${property.id}`}
                houseImage={property.images && property.images.length > 0 ? `${API_ASSET_URL}${property.images[0]}` : '"/images/house-sample-2.jpg"'}
                name={property.name}
                address={property.address}
                rentFee={property.monthlyPrice}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
              />
            </div>
          ))}
        </Slider>
      )}

      {/* EMPTY */}
      {status === request.SUCCESS && !properties.length && (
        <StateList
          title="NO PROPERTIES"
          description="No properties added yet."
          type={stateListTypes.EMPTY}
        />
      )}

      {/* ERROR */}
      {status === request.ERROR && (
        <StateList
          title="OOPS!"
          description="An error ocurred while fetching properties."
          type={stateListTypes.ERROR}
        />
      )}
    </div>
  );
};

export default HomeRecentlyAddedProperties;
