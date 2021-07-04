import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import Slider from 'react-slick';
import { request } from 'shared/types';
import PropertyInfo from 'widgets/PropertyInfo/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import { API_ASSET_URL } from 'services/index';

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

const PropertiesDetailsRecentlyViewedProperties = ({ properties, status }) => {
  console.log(properties)
  return (<div className="container max-width">
    <div className="recently-viewed">
      <h3 className="main-title">
        RECENTLY <span className="text-primary font-weight-bold">VIEWED</span>
      </h3>
      <p className="main-subtitle mt-1 mt-md-2 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

      {status === request.SUCCESS && !!properties?.length && (
        <Slider {...settings} className="list">
          {properties.map((property) => (
            <div key={property.apartment.id} className="item">
              <PropertyInfo
                link={`/properties/${property.apartment.id}`}
                houseImage={property.apartment.images && property.apartment.images.length > 0 ? `${API_ASSET_URL}${property.apartment.images[0]}` : '"/images/house-sample-2.jpg"'}
                name={property.apartment.name}
                address={property.apartment.address}
                rentFee={property.apartment.monthlyPrice}
                bedrooms={property.apartment.bedrooms}
                bathrooms={property.apartment.bathrooms}
                context={property.context}
                propId={property.apartment.id}
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
  </div>)
};

export default PropertiesDetailsRecentlyViewedProperties;
