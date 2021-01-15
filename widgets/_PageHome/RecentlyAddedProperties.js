/* eslint-disable react-hooks/exhaustive-deps */
import { NextArrow, PrevArrow } from 'components/SlickArrows';
import { useProperties } from 'hooks/useProperties';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PropertyInfo from 'widgets/PropertyInfo/index';

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

const RecentlyAddedProperties = () => {
  // STATES
  const [properties, setProperties] = useState([]);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();

  // METHODS
  useEffect(() => {
    fetchProperties(null, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  }, []);

  const onFetchSuccess = ({ response }) => {
    setProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while searching properties.', toastTypes.ERROR);
  };

  return (
    <div className="recently-added-properties container">
      <h3 className="main-title">
        RECENTLY ADDED <span className="text-primary font-weight-bold">PROPERTIES</span>
      </h3>
      <p className="main-subtitle mt-1 mt-md-4 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

      {!!properties.length && (
        <Slider {...propertiesSlickSettings} className="properties">
          {properties.map((property) => (
            <div key={property.id} className="item">
              <PropertyInfo
                link={`properties/${property.id}`}
                houseImage="/images/house-sample-1.jpg"
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
    </div>
  );
};

export default RecentlyAddedProperties;
