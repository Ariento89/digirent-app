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
      </div>
    </div>
  );

export default PropertiesRecommended;
