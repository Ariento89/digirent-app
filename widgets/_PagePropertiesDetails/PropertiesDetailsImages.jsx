import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import SocialMedias from 'widgets/SocialMedias/index';
import { API_ASSET_URL } from 'services/index';

const PropertiesDetailsImages = (images) => {
  const [mainImage, setMainImage] = useState(`${API_ASSET_URL}${images.images[0]}`);
  const slider = useRef(null);

  const houseInsidesSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    focusOnSelect: true,
    beforeChange: (oldIndex, newIndex) => {
      setMainImage(images.images[newIndex] ? `${API_ASSET_URL}${images.images[newIndex]}` : '');
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
    <>
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
        ref={(c) => {
          slider.current = c;
        }}
        {...houseInsidesSettings}
        className="house-insides mt-4"
      >
        {images.images.map((item) => (
          <div key={item} className="item">
            <div className="photo" style={{ backgroundImage: `url(${API_ASSET_URL}${item})` }} />
          </div>

        ))}
        {/* {houseInsides.map((item) => (
          <div key={item} className="item">
            <div className="photo" style={{ backgroundImage: `url(${API_ASSET_URL}${item})` }} />
          </div>
        ))} */}
      </Slider>
    </>
  );
};

export default PropertiesDetailsImages;
