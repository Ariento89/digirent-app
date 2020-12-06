import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import PageWrapper from 'widgets/PageWrapper';
import { PropertyInfo } from 'widgets/PropertyInfo/index';
import SearchFormPropertyList from 'widgets/SearchForm/SearchFormPropertyList';
import TableHeader from 'widgets/TableHeader/TableHeader';
import Slider from 'react-slick';

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

const Page = () => (
  <PageWrapper title="DigiRent - Property List" pageName="property-list">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

    <div className="landing">
      <div className="content">
        <div className="left">
          <div className="title">PROPERTY</div>
          <div className="subtitle">LIST</div>
        </div>

        <div className="right">
          <SearchFormPropertyList />
        </div>
      </div>

      <div className="scroll-down">
        <div className="white-space" />
        <div className="scroll-down-wrapper">
          <img src="/images/scroll-down-space.svg" className="scroll-down-space" alt="icon space" />
          <img src="/images/icon/icon-caret-down-white.svg" className="scroll-down" alt="icon" />
        </div>
        <div className="white-space" />
      </div>
    </div>

    <div className="container">
      <div className="rental-houses">
        <h3 className="main-title">
          RENTAL HOUSE IN <span className="text-primary font-weight-bold">INDIA</span>
        </h3>
        <p className="main-subtitle mt-1 mt-md-2 dark-gray">
          2 NEW RENTAL PROPERTIES IN INDIA IN THE LAST 30 DAYS
        </p>

        <TableHeader classNames="rental-houses-table-header mt-5" />

        <div className="row list">
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <div key={key} className="col-12 col-md-6 col-lg-4 item">
              <PropertyInfo
                name="Pahvale Villa"
                location="Indore, Madhya Pradesh, India"
                rentFee="246"
                bedCount="4"
                crCount="2"
                link="/property-details"
              />
            </div>
          ))}
        </div>

        <div className="pagination mt-5">
          <button type="button" className="btn-arrow prev">
            <img src="/images/icon/icon-caret-left-white.svg" alt="icon" />
          </button>
          <div className="pages">
            <span className="number active">
              01
              <span className="line" />
            </span>
            <span className="number">02</span>
            <span className="number">03</span>
            <span className="number">04</span>
            <span className="number">05</span>
          </div>
          <button type="button" className="btn-arrow next">
            <img src="/images/icon/icon-caret-right-white.svg" alt="icon" />
          </button>
        </div>
      </div>
    </div>

    <div className="container max-width">
      <div className="recommendations">
        <h3 className="main-title">RECOMMENDED FOR YOU</h3>

        <Slider {...slickSettings} className="list">
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
  </PageWrapper>
);

export default Page;
