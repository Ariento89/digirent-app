import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';
import { Reaction } from 'widgets/Reaction';
import { SocialMedias } from 'widgets/SocialMedias/index';

const data = [
  { id: 1, image: '/images/house-sample-1.jpg', description: 'Sample' },
  { id: 2, image: '/images/house-sample-2.jpg', description: 'Sample' },
  { id: 3, image: '/images/house-sample-3.jpg', description: 'Sample' },
  { id: 4, image: '/images/house-sample-1.jpg', description: 'Sample' },
  { id: 5, image: '/images/house-sample-2.jpg', description: 'Sample' },
  { id: 6, image: '/images/house-sample-3.jpg', description: 'Sample' },
];

const Page = () => {
  const [reaction, setReaction] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  const onReact = (value, id) => {
    setReaction((reactions) => ({
      ...reactions,
      [id]: value,
    }));
  };

  return (
    <>
      <PageWrapper title="DigiRent - Media" pageName="media">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container-fluid">
          <h3 className="main-title">MEDIA</h3>
          <p className="main-desc mt-5 mx-auto text-center">
            <span className="text-primary">Digi Rent</span> helps you with small explainers to
            understand certain topics better. In these clips we will inform you regarding different
            matters around rentals, legislation and other important topics.
          </p>

          <div className="medias">
            <div className="row">
              {data.map((item) => (
                <div key={item.id} className="col-12 col-lg-4">
                  <div className="media-item">
                    <div className="thumbnail" style={{ backgroundImage: `url(${item.image})` }}>
                      <img
                        src="/images/icon/icon-play-button-white.svg"
                        className="icon-play-button"
                        alt="play icon"
                        onClick={() => setVideoModalVisible(true)}
                      />
                    </div>
                    <div className="information mt-3">
                      <SocialMedias />

                      <p className="title">Title movie</p>

                      <Reaction
                        reaction={reaction?.[item.id]}
                        onReact={(value) => onReact(value, item.id)}
                        likeIconClassNames="mx-1"
                        dislikeIconClassNames="mx-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination mt-5">
              <button type="button" className="btn-arrow prev">
                <img src="/images/icon/icon-caret-left-white.svg" alt="left arrow" />
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
                <img src="/images/icon/icon-caret-right-white.svg" alt="right arrow" />
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>

      <Modal
        dialogClassName="modal-xl"
        show={videoModalVisible}
        onHide={() => setVideoModalVisible(false)}
        centered
      >
        <Modal.Body>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/r0awq8AyI3g?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
              id="video"
              allowscriptaccess="always"
              allow="autoplay"
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
