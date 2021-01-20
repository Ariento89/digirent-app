import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import Slider from 'react-slick';
import { request } from 'shared/types';
import PropertyInfo from 'widgets/PropertyInfo/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';

const settings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  swipe: false,
  responsive: [
    {
      breakpoint: 1599,
      settings: {
        slidesToShow: 3,
      },
    },
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

const PropertiesDetailsRecentlyViewedProperties = ({ properties, status }) => (
  <div className="container max-width">
    <div className="recently-viewed">
      <h3 className="main-title">
        RECENTLY <span className="text-primary font-weight-bold">VIEWED</span>
      </h3>
      <p className="main-subtitle mt-1 mt-md-2 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

      {status === request.SUCCESS && !!properties?.length && (
        <Slider {...settings} className="list">
          {properties.map((property) => (
            <div key={property.id} className="item">
              <PropertyInfo
                link={`/properties/${property.id}`}
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

      {/* EMPTY */}
      {status === request.SUCCESS && !properties?.length && (
        <StateList
          className="mx-auto mt-4"
          title="LIST IS EMPTY"
          description="You have not viewed any properties yet."
          type={stateListTypes.EMPTY}
        />
      )}

      {/* ERROR */}
      {status === request.ERROR && (
        <StateList
          className="mx-auto mt-4"
          title="OOPS!"
          description="An error ocurred while fetching your recently viewed properties."
          type={stateListTypes.ERROR}
        />
      )}
    </div>
  </div>
);

export default PropertiesDetailsRecentlyViewedProperties;
