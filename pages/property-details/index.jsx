import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import PageWrapper from 'widgets/PageWrapper';
import { PropertyInfo } from 'widgets/PropertyInfo/index';
import { SocialMedias } from 'widgets/SocialMedias/index';

const houseInsides = [
  { id: 1, image: '/images/property-detail-sample.jpg' },
  { id: 2, image: '/images/property-detail-inside-1.jpg' },
  { id: 3, image: '/images/property-detail-sample.jpg' },
  { id: 4, image: '/images/property-detail-inside-2.jpg' },
];

const recentlyViewedSettings = {
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

const Page = () => (
  <PageWrapper title="DigiRent - Property Details" pageName="property-details">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

    <PropertyDetail />
    <RecentlyViewed />
  </PageWrapper>
);

const PropertyDetail = () => {
  const [mainImage, setMainImage] = useState('/images/property-detail-sample.jpg');
  const slider = useRef(null);

  const houseInsidesSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    focusOnSelect: true,
    beforeChange: function (oldIndex, newIndex) {
      setMainImage(houseInsides[newIndex].image);
    },
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          dots: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  const onNext = () => slider?.current?.slickNext();

  const onPrev = () => slider?.current?.slickPrev();

  return (
    <div className="container max-width property-detail mt-3 mt-md-5">
      <div className="row">
        <div className="col-12 col-xl-7">
          <div className="house-photo" style={{ backgroundImage: `url(${mainImage})` }}>
            <SocialMedias />

            <div className="star-photo">
              <img src="/images/icon/icon-star-white.svg" alt="icon" />
            </div>

            <div className="slick-arrows-container">
              <PrevArrow onClick={onPrev} />
              <NextArrow onClick={onNext} />
            </div>
          </div>

          <Slider
            ref={(c) => (slider.current = c)}
            {...houseInsidesSettings}
            className="house-insides mt-4"
          >
            {houseInsides.map((item) => (
              <div key={item.id} className="item">
                <div className="photo" style={{ backgroundImage: `url(${item.image})` }}></div>
              </div>
            ))}
          </Slider>

          <div className="main-box house-long-description">
            <p className="main-desc font-weight-bold text-primary">DESCRIPTION</p>
            <hr className="my-4" />
            <p className="main-desc dark-gray2">
              State of the art Fitness Facility and Yoga Studio - When you live at The Met you no
              longer need a gym membership!
            </p>
            <p className="main-desc dark-gray2">- Free-weight squat rack</p>
            <p className="main-desc dark-gray2">- Dumbbells ranging from 5lbs - 75lbs</p>
            <p className="main-desc dark-gray2">- 5 Life Fitness Stationary bikes</p>
            <p className="main-desc dark-gray2">- 3 Life Fitness Treadmills</p>
            <p className="main-desc dark-gray2">- 2 Life Fitness Ellipticals</p>
            <p className="main-desc dark-gray2">- Life Fitness Stairclimber</p>
            <p className="main-desc dark-gray2">- Life Fitness Rowing machine</p>
            <p className="main-desc dark-gray2">- Life Fitness SYNRGY360+ Multi-use station</p>
            <p className="main-desc dark-gray2">- Life Fitness Leg Extension Machine</p>
            <p className="main-desc dark-gray2">- Life Fitness Leg Curl Machine</p>
          </div>
        </div>

        <div className="col-12 col-xl-5 mt-5 mt-xl-0">
          <div className="property-name">
            <span className="apartment-text">APARTMENT</span>
            <p className="name">Pahvale Villa</p>
            <div className="d-flex align-items-center">
              <img
                src="/images/icon/icon-map-marker-primary.svg"
                height="20"
                width="20"
                alt="icon"
              />
              <p className="ml-2 main-desc">1213h 11th Avenue SQ, Indore, Madhya Pradesh, India</p>
            </div>

            <button className="btn-open-map">
              <a href="https://goo.gl/maps/8v5n9qm6QhgUoDCPA" target="_blank" rel="noreferrer">
                <img
                  src="/images/icon/icon-open-map-primary.svg"
                  height="30"
                  width="30"
                  alt="icon"
                />
                <span>OPEN MAP</span>
              </a>
            </button>
          </div>

          <div className="property-other-info">
            <div className="row">
              <div className="col-12 col-sm-6 col-xl-6">
                <div className="item item-price">
                  <img src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
                  <div className="divider left" />
                  <p className="main-desc dark-gray2 main-title">Monthly Price</p>
                  <div className="divider right" />
                  <p className="main-desc text-primary">€246</p>
                </div>

                <div className="item item-price">
                  <img src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
                  <div className="divider left" />
                  <p className="main-desc dark-gray2 main-title">Utilities Price</p>
                  <div className="divider right" />
                  <p className="main-desc text-primary">€75</p>
                </div>

                <div className="item item-price">
                  <img src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
                  <div className="divider left" />
                  <p className="main-desc dark-gray2 main-title">Security Deposit</p>
                  <div className="divider right" />
                  <p className="main-desc text-primary">€50</p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-6">
                <div className="item item-others">
                  <div className="d-flex align-items-center justify-content-between">
                    <img
                      src="/images/icon/icon-bed-primary.svg"
                      height="20"
                      width="20"
                      alt="icon"
                    />
                    <p className="ml-2 main-desc dark-gray2">4</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between ml-4">
                    <img
                      src="/images/icon/icon-bath-tub-primary.svg"
                      height="20"
                      width="20"
                      alt="icon"
                    />
                    <p className="ml-2 main-desc dark-gray2">2</p>
                  </div>
                </div>

                <div className="item item-others">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="sqft-icon">sqft</div>
                    <p className="ml-2 main-desc dark-gray2">120</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between ml-4">
                    <img
                      src="/images/icon/icon-couch-primary.svg"
                      height="20"
                      width="20"
                      alt="icon"
                    />
                    <p className="ml-1 main-desc dark-gray2">Furnished</p>
                  </div>
                </div>

                <div className="item item-date">
                  <img
                    src="/images/icon/icon-calendar-primary.svg"
                    height="20"
                    width="20"
                    alt="icon"
                  />
                  <p className="main-desc dark-gray2 ml-3">12.02.20 - 25.05.20</p>
                </div>
              </div>
            </div>
          </div>

          <div className="property-amenities">
            <p className="main-desc text-primary">AMENITIES</p>
            <div className="divider" />
            <div className="list">
              <span className="item main-desc dark-gray2">
                Gym <span className="icon"></span>
              </span>
              <span className="item main-desc dark-gray2">
                Wheelchair <span className="icon"></span>
              </span>
              <span className="item main-desc dark-gray2">
                Park <span className="icon"></span>
              </span>
              <span className="item main-desc dark-gray2">
                Dogs Allowed <span className="icon"></span>
              </span>
            </div>
          </div>

          <button className="button min-width btn-apply d-block mx-auto">APPLY</button>

          <div className="main-box landlord-details">
            <div className="landlord-photo">
              <div className="photo"></div>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <img
                src="/images/icon/icon-star-filled-yellow.svg"
                height="25"
                width="25"
                className="mr-2"
              />
              <p className="main-desc text-primary mt-2">EXCELLENT LANDLORD</p>
            </div>

            <div className="landlord-name mt-3 mt-xl-4">
              <p className="name text-center">Tim</p>
              <p className="main-desc dark-gray2 text-center">Speaks Dutch, English</p>
            </div>

            <div className="landlord-response mt-3">
              <div className="d-flex align-items-center">
                <p className="main-desc dark-gray2 mr-1">RESPONSE RATE </p>
                <p className="main-desc text-primary">100%</p>
              </div>

              <div className="divider" />

              <div className="d-flex align-items-center">
                <p className="main-desc dark-gray2 mr-1">RESPONSE TIME </p>
                <p className="main-desc text-primary">2 HOURS</p>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center mt-4">
              <img src="/images/icon/icon-checked.svg" height="20" width="20" className="mr-2" />
              <p className="main-desc dark-gray2">
                <span className="font-weight-bold text-primary">50 </span>SUCCESSFUL BOOKINGS
              </p>
            </div>

            <button className="button min-width mt-4 d-block mx-auto">CONTACT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentlyViewed = () => (
  <div className="container max-width">
    <div className="recently-viewed">
      <h3 className="main-title">
        RECENTLY <span className="text-primary font-weight-bold">VIEWED</span>
      </h3>
      <p className="main-subtitle mt-1 mt-md-2 dark-gray">FIND YOUR NEW HOME RIGHT HERE</p>

      <Slider {...recentlyViewedSettings} className="list">
        {[1, 2, 3, 4, 5].map((key, index) => (
          <div key={key} className="item">
            <PropertyInfo
              name="Pahvale Villa"
              location="Indore, Madhya Pradesh, India"
              rentFee="246"
              bedCount="4"
              crCount="2"
              houseImage={`/images/house-sample-${(index % 3) + 1}.jpg`}
              link="/property-details"
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

export default Page;
