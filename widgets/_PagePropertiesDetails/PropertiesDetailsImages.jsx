import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import SocialMedias from 'widgets/SocialMedias/index';
import { API_ASSET_URL } from 'services/index';

const houseInsides = [
  { id: 0, image: '/images/property-detail-sample.jpg' },
  { id: 1, image: '/images/property-detail-inside-1.jpg' },
  { id: 2, image: '/images/property-detail-sample.jpg' },
  // { id: 4, image: '/images/property-detail-inside-2.jpg' },
];

const PropertiesDetailsImages = (images) => {
  const [mainImage, setMainImage] = useState(`${API_ASSET_URL}${images.images[0]}`);
  const [imgs, setImgs] = useState([]);

  const slider = useRef(null);

  useEffect(() => {
    setImgs(images.images);
  }, [images]);

  const houseInsidesSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 2,
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
      {imgs.map((item) => (
        <h1 key={item}>ward</h1>
      ))}
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
            <div className="photo" style={{ backgroundImage: `url(${API_ASSET_URL}${imgs[item.id]})` }} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default PropertiesDetailsImages;
