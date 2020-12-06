import { NextArrow, PrevArrow } from 'components/SlickArrows';
import Slider from 'react-slick';
import { PropertyInfo } from 'widgets/PropertyInfo';

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

const RecentlyAddedProperties = () => (
  <div className="recently-added-properties container">
    <h3 className="main-title">
      RECENTLY ADDED <span className="text-primary font-weight-bold">PROPERTIES</span>
    </h3>
    <p className="main-subtitle mt-1 mt-md-4 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

    <Slider {...propertiesSlickSettings} className="properties">
      {[1, 2, 3, 4, 5].map((key, index) => (
        <div key={key} className="item">
          <PropertyInfo
            name="Pahvale Villa"
            location="Indore, Madhya Pradesh, India"
            rentFee="246"
            bedCount="4"
            crCount="2"
            houseImage={`/images/house-sample-${(index % 3) + 1}.jpg`}
            showSelection={false}
            link="/property-details"
          />
        </div>
      ))}
    </Slider>
  </div>
);

export default RecentlyAddedProperties;
