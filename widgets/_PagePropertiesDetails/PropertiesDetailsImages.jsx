import { NextArrow, PrevArrow } from 'components/SlickArrows/index';
import { useRef, useState, useEffect } from 'react';
import { API_ASSET_URL } from 'services/index';
import { SRLWrapper } from "simple-react-lightbox";

const houseInsides = [
  { id: 0, image: '/images/property-detail-sample.jpg' },
  { id: 1, image: '/images/property-detail-inside-1.jpg' },
  { id: 2, image: '/images/property-detail-sample.jpg' },
  { id: 3, image: '/images/property-detail-inside-2.jpg' },
  { id: 4, image: '/images/property-detail-inside-2.jpg' },
  { id: 5, image: '/images/property-detail-inside-2.jpg' },
];

const PropertiesDetailsImages = (images) => {
  const [mainImage, setMainImage] = useState(`${API_ASSET_URL}${images.images[0]}`);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    let imagesTemp = [];
    for (let i = 0; i < 7; i ++) {
      imagesTemp.push(images.images[0]);
    }
    setImgs(imagesTemp);
  }, [images]);
  
  return (
    <>
      <div className="d-flex">
        <div className="flex-1 pb-0.5">
          <div className="house-photo h-full" style={{ backgroundImage: `url(${mainImage})`, borderRadius: 5 }}>
          </div>
        </div>
        <div className="flex-1">
          <SRLWrapper>
            <div className="d-flex h-full flex-wrap">
              {imgs.filter((_, i) => i < 4).map((item, i) => {
                if (i === 3 && imgs.length > 4) {
                  return (
                    <div key={i} className="w-1/2 h-1/2 pl-0.5 pb-0.5 cursor-pointer">
                      <div
                        className="photo h-full position-relative"
                        style={{
                          borderRadius: 5,
                        }}
                      >
                        <img src={`${API_ASSET_URL}${imgs[i]}`} />
                        <div style={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          padding: '0 1rem 0 1rem',
                          position: 'absolute',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>
                          <h4 style={{
                            fontSize: '1.125rem',
                            color: 'white',
                            overflow: 'hidden',
                            textOverflow: 'initial'
                          }}>{imgs.length - 4} more photos available</h4>
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={i} className="w-1/2 h-1/2 pl-0.5 pb-0.5 cursor-pointer">
                    <div
                      className="photo h-full"
                      style={{
                        borderRadius: 5,
                      }}
                    >
                      <img src={`${API_ASSET_URL}${imgs[i]}`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </SRLWrapper>
        </div>
      </div>
    </>
  );
};

export default PropertiesDetailsImages;
