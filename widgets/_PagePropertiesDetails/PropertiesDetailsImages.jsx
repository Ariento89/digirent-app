import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import SocialMedias from 'widgets/SocialMedias/index';

const houseInsides = [
  { id: 1, image: '/images/property-detail-sample.jpg' },
  { id: 2, image: '/images/property-detail-inside-1.jpg' },
  { id: 3, image: '/images/property-detail-sample.jpg' },
  { id: 4, image: '/images/property-detail-inside-2.jpg' },
];

const PropertiesDetailsImages = () => {
  const [mainImage, setMainImage] = useState('/images/property-detail-sample.jpg');
  const slider = useRef(null);

  const houseInsidesSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    focusOnSelect: true,
    beforeChange: (oldIndex, newIndex) => {
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
        {houseInsides.map((item) => (
          <div key={item.id} className="item">
            <div className="photo" style={{ backgroundImage: `url(${item.image})` }} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default PropertiesDetailsImages;
