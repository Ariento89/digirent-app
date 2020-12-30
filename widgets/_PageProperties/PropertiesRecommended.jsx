import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import Slider from 'react-slick';
import PropertyInfo from 'widgets/PropertyInfo/index';

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

const PropertiesRecommended = () => (
  <div className="container max-width">
    <div className="recommendations">
      <h3 className="main-title">RECOMMENDED FOR YOU</h3>

      <Slider {...slickSettings} className="list">
        {[1, 2, 3, 4, 5].map((key, index) => (
          <div key={key} className="item">
            <PropertyInfo
              name="Pahvale Villa"
              address="Indore, Madhya Pradesh, India"
              rentFee="246"
              bedrooms="4"
              bathrooms="2"
              houseImage={`/images/house-sample-${(index % 3) + 1}.jpg`}
              link="/property-details"
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

export default PropertiesRecommended;
