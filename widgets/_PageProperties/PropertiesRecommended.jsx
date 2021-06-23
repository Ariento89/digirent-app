import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import Slider from 'react-slick';
import PropertyInfo from 'widgets/PropertyInfo/index';
import { API_ASSET_URL } from 'services/index';

const slickSettings = {
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

const PropertiesRecommended = ({ properties }) =>
  !!properties?.length && (
    <div className="container max-width">
      <div className="recommendations">
        <h3 className="main-title">RECOMMENDED FOR YOU</h3>

        <Slider {...slickSettings} className="list">
          {properties.map((property) => (
            <div key={property.apartment.id} className="item">
              <PropertyInfo
                link={`/properties/${property.apartment.id}`}
                houseImage={property.apartment.images}
                name={property.apartment.name}
                address={property.apartment.address}
                rentFee={property.apartment.monthlyPrice}
                houseType={property.apartment.houseType}
                bedrooms={property.apartment.bedrooms}
                bathrooms={property.apartment.bathrooms}
                context={property.context}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );

export default PropertiesRecommended;
