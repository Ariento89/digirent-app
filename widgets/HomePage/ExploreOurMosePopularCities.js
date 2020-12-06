import { PrevArrow } from 'components/SlickArrows';
import { NextArrow } from 'components/SlickArrows';
import Slider from 'react-slick';
import Link from 'next/link';

const cities = [
  '/images/city-1.jpg',
  '/images/city-2.jpg',
  '/images/city-3.jpg',
  '/images/city-4.jpg',
  '/images/city-5.jpg',
];

const citiesSlickSettings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  centerMode: true,
  centerPadding: '0',
  infinite: true,
  dots: true,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        slidesToShow: 1,
      },
    },
  ],
};

const ExploreOurMosePopularCities = () => (
  <div className="explore-our-most-popular-cities container-fluid">
    <h3 className="main-title">
      EXPLORE OUR MOST <span className="text-primary font-weight-bold">POPULAR CITIES</span>
    </h3>
    <p className="main-subtitle mt-4 dark-gray max-width">
      DISCOVER THOUSANDS OF APARTMENTS AND HOMES FOR RENT IN DIFFERENT CITIES
    </p>

    <Slider {...citiesSlickSettings} className="cities">
      {cities.map((cityImage, index) => (
        <div key={index} className="item">
          <div className="city" style={{ backgroundImage: `url(${cityImage})` }}>
            <h3 className="title text-white">THE CITY</h3>
            <Link href="/property-list">
              <button className="button min-width">VIEW</button>
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

export default ExploreOurMosePopularCities;
