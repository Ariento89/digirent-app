import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import Slider from 'react-slick';
import PropertyInfo from 'widgets/PropertyInfo/index';

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

const PropertiesDetailsRecentlyViewed = ({ properties }) => (
  <div className="container max-width">
    <div className="recently-viewed">
      <h3 className="main-title">
        RECENTLY <span className="text-primary font-weight-bold">VIEWED</span>
      </h3>
      <p className="main-subtitle mt-1 mt-md-2 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

      <Slider {...settings} className="list">
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

export default PropertiesDetailsRecentlyViewed;
