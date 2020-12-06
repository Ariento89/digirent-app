/* eslint-disable react/jsx-props-no-spreading */
import { NextArrow, PrevArrow } from 'components/SlickArrows';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { userTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import { Reaction } from 'widgets/Reaction';
import { SocialMedias } from 'widgets/SocialMedias';
import { UserSelect } from 'widgets/UserSelect';

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const slickSettings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        dots: true,
      },
    },
  ],
};

const Page = () => {
  const router = useRouter();

  const [hash, setHash] = useState(userTypes.TENANT);
  const [reaction, setReaction] = useState(null);

  // Effect: Get hash value
  useEffect(() => {
    const hashValue = router.asPath.split('#')?.[1] || userTypes.TENANT;
    setHash(hashValue);
  }, [router]);

  const onSelect = (userType) => {
    router.replace(`#${userType}`);
  };

  const onReact = (value, id) => {
    setReaction((reactions) => ({
      ...reactions,
      [id]: value,
    }));
  };

  return (
    <PageWrapper title="DigiRent - Rental Tips" pageName="rental-tips">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
      <div className="container-fluid container-md">
        <h3 className="main-title">RENTAL TIPS</h3>

        <UserSelect selected={hash} onSelect={onSelect} />

        <Slider {...slickSettings} className="list-carousel">
          {data.map((item) => (
            <div className="item" key={item.id}>
              <span className="number">{item.id}</span>

              <SocialMedias />

              <div className="main-box wrapper">
                <div className="top-background" />
                <p className="main-desc text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="main-desc text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <Reaction
                  reaction={reaction?.[item.id]}
                  onReact={(value) => onReact(value, item.id)}
                  classNames="no-shadow mt-5"
                  likeIconClassNames="mx-1"
                  dislikeIconClassNames="mx-1"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </PageWrapper>
  );
};

export default Page;
