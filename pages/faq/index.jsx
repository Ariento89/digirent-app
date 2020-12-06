import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';
import { Reaction } from 'widgets/Reaction';

const data = [
  {
    icon: '/images/icon/icon-roof-primary.svg',
    description: 'I am looking for a rental house, how can I start?',
  },
  {
    icon: '/images/icon/icon-check-primary.svg',
    description: 'What are my chances at Digi Rent?',
  },
  {
    icon: '/images/icon/icon-chat-primary.svg',
    description: 'Can you respond immediately to rental properties?',
  },
  { icon: '/images/icon/icon-like-active.svg', description: 'Is the offer up to date?' },
  {
    icon: '/images/icon/icon-smartphone-primary.svg',
    description: 'What is the phone number for Digi Rent?',
  },
  {
    icon: '/images/icon/icon-cash-primary.svg',
    description: 'I have paid but my account has not been activated. What should I do?',
  },
  { icon: '/images/icon/icon-search-primary.svg', description: 'I found a rental home. What now?' },
  {
    icon: '/images/icon/icon-cancel-primary.svg',
    description: 'How do I cancel my Premium account?',
  },
  { icon: '/images/icon/icon-report-primary.svg', description: 'Where can I report complaints?' },
  {
    icon: '/images/icon/icon-checklist-primary.svg',
    description: 'Does the rental sector work with waiting lists or draw?',
  },
];

const Page = () => {
  const [faqModalVisible, setFaqModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reaction, setReaction] = useState(null);

  const viewFaq = (item) => {
    setSelectedItem(item);
    setFaqModalVisible(true);
  };

  const onClose = () => setFaqModalVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - FAQ" pageName="faq">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container">
          <h3 className="main-title">FAQ</h3>
          <p className="main-subtitle">HOW DOES IT WORK?</p>
          <div className="main-box">
            <p className="main-desc">
              We can imagine that we’ve missed something or you just want some better explanation.
              Please find more information below. We can always be reached by email or telephone if
              you can’t find your answer.
            </p>
          </div>

          <div className="list row">
            {data.map((item) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div className="item">
                  <div className="rounded-icon not-responsive">
                    <img src={item.icon} alt="item icon" />
                  </div>
                  <div className="desc-wrapper">
                    <span>{item.description}</span>
                  </div>
                  <button
                    type="button"
                    className="button-nav primary s-40"
                    onClick={() => viewFaq(item)}
                  >
                    <img src="/images/icon/icon-arrow-right-white.svg" alt="item icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>

      <Modal show={faqModalVisible} onHide={onClose} id="faq-modal" centered>
        <Modal.Body>
          <div className="modal-background" />
          <button type="button" className="button-nav primary s-40" onClick={onClose}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content">
            <div className="rounded-icon main-icon mx-auto">
              <img src={selectedItem?.icon} alt="item icon" />
            </div>

            <span className="title">{selectedItem?.description}</span>
            <span className="description">
              Yes, you will be able to respond directly when you’ve registered yourself at our
              website. Do know that a completer profile gives you more chances of being picked by
              the landlord
            </span>

            <Reaction
              reaction={reaction}
              onReact={(value) => setReaction(value)}
              classNames="no-shadow mt-5"
              likeIconClassNames="mx-1"
              dislikeIconClassNames="mx-1"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
