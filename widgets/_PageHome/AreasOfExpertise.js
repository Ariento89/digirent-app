import { NextArrow, PrevArrow } from 'components/SlickArrows';
import Slider from 'react-slick';

const expertiseSlickSettings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: false,
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
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
};

const AreasOfExpertise = () => (
  <div className="areas-of-expertise container">
    <h3 className="main-title">
      AREAS OF <span className="text-primary font-weight-bold">EXPERTISE?</span>
    </h3>
    <p className="main-subtitle mt-1 mt-md-4 dark-gray">
      THESE ADVANTAGES MAKE IT EASIER TO USE OUR PLATFORM <br className="d-none d-md-block" /> FAST
      EASY AND TRANSPARENT.
    </p>

    <Slider {...expertiseSlickSettings} className="expertise">
      <div className="item">
        <div className="rounded-icon icon not-responsive mx-auto">
          <img src="/images/steps-sign-docu-online.png" alt="item icon" />
        </div>

        <div className="outer-circle">
          <div className="position-wrapper">
            <div className="inner-circle">
              <p className="title text-center">Sign documents from home</p>
              <p className="main-desc text-center">
                At Digi Rent we believe in digitization in all ways from viewing a potential house
                to signing contracts online. This can be done remotely and ensures that the process
                goes much faster nowadays. Signed documents are safely stored in your own
                environment. This way you can access your data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="item">
        <div className="rounded-icon icon not-responsive mx-auto">
          <img src="/images/steps-money-online.png" alt="item icon" />
        </div>

        <div className="outer-circle">
          <div className="position-wrapper">
            <div className="inner-circle">
              <p className="title text-center">Payments through our system</p>
              <p className="main-desc text-center">
                At Digi Rent we believe in digitization in all ways from viewing a potential house
                to signing contracts online. This can be done remotely and ensures that the process
                goes much faster nowadays. Signed documents are safely stored in your own
                environment. This way you can access your data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="item">
        <div className="rounded-icon icon not-responsive mx-auto">
          <img src="/images/steps-list-your-house-online.png" alt="item icon" />
        </div>

        <div className="outer-circle">
          <div className="position-wrapper">
            <div className="inner-circle">
              <p className="title text-center">Sign documents from home</p>
              <p className="main-desc text-center">
                At Digi Rent we believe in digitization in all ways from viewing a potential house
                to signing contracts online. This can be done remotely and ensures that the process
                goes much faster nowadays. Signed documents are safely stored in your own
                environment. This way you can access your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  </div>
);

export default AreasOfExpertise;
