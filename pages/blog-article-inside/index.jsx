import { useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import { Reaction } from 'widgets/Reaction';
import { SocialMedias } from 'widgets/SocialMedias';
import Modal from 'react-bootstrap/Modal';

const archives = [
  { date: 'March 2018', number: 20 },
  { date: 'March 2018', number: 20 },
  { date: 'April 2018', number: 40 },
  { date: 'January 2020', number: 107 },
  { date: 'February 2020', number: 20 },
  { date: 'March 2020', number: 107 },
  { date: 'May 2020', number: 20 },
];

const recentBlogs = [
  {
    day: '18',
    month: 'AUG',
    year: '2020',
    description: 'Fun facts about Netherlands',
  },
  {
    day: '18',
    month: 'AUG',
    year: '2020',
    description: 'Fun facts about Netherlands',
  },
  {
    day: '18',
    month: 'AUG',
    year: '2020',
    description: 'Fun facts about Netherlands',
  },
];

const Page = () => {
  const [blogModalVisible, setBlogModalVisible] = useState(false);
  const [reaction, setReaction] = useState(null);

  const onShow = () => setBlogModalVisible(true);

  const onClose = () => setBlogModalVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - Blog" pageName="blog-article-inside">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container-fluid container-lg mt-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="main-box blog-content-wrapper pb-5">
                <div className="blog-header">
                  <SocialMedias />

                  <div className="statistics">
                    <div className="item">
                      <img src="/images/icon/icon-comment-primary.svg" alt="item icon" />
                      <span className="text-primary">103</span>
                    </div>

                    <div className="item">
                      <img src="/images/icon/icon-like-active.svg" alt="item icon" />
                      <span className="text-primary">502</span>
                    </div>
                  </div>
                </div>

                <div className="blog-image">
                  <img className="bottom-design" src="/images/blog-round-line.svg" alt="outline" />
                  <div className="overlay" />
                  <div className="date">
                    <span className="font-weight-bold">18</span> AUG
                    <span className="year">2020</span>
                  </div>
                </div>

                <div className="blog-texts px-0 px-sm-4">
                  <h3 className="main-title-2">
                    FUN FACTS ABOUT
                    <span className="text-primary font-weight-bold"> NETHERLANDS</span>
                  </h3>

                  <p className="main-desc mt-4 mt-sm-5">
                    As I have mentioned many times here, the Netherlands is a very beautiful place
                    to live. According to case studies and charts, this country has been
                    consistently in the top 10, at least from 2012 up until now, for the happiest
                    countries, with the best quality life. If you have visited at least once the
                    Netherlands, it will be more than obvious for you, since you can sense the
                    tranquillity and the nice atmosphere that reigns above the cities, even the most
                    crowded ones. Even in the busiest days of the year, walking on my way to work or
                    to my university back then, I have always came across to some friends’ groups
                    chilling out in a park or looking for a cool café to stay.
                  </p>

                  <p className="main-desc font-weight-bold text-primary text-center mt-4">
                    BLUE SUBTITLE
                  </p>

                  <p className="main-desc">
                    This constant inner peace that is populating these northern cities should be no
                    surprise, since the government has decided to put as a priority the health and
                    mental wellbeing of the local population. In fact, they have decided to create
                    and vote some laws which should protect the workers’ right. They have decided to
                    give fewer working hours to every worker, without lowering their earnings, so
                    that the local population may spend more time on their own outside, with their
                    loved ones. That is why you can always see so many people around, having fun. It
                    is because the government understood that, in order to have an healthy and
                    working population.. you have to give them some space. I think it should be
                    obvious, but many other countries still do not understand. For example, I do
                    feel more energetic and ready to work, after I had some fun with my friends, or
                    I have taken a little vacation. When you have some time off work, to dedicate to
                    something else, you can detach yourself from the worrying businesses, recharge
                    your batteries and most of all, remember why you chose that job in the first
                    place.
                  </p>

                  <p className="main-desc mt-3">
                    Beside all of these things, the Netherlands could be such a fun and exciting
                    country to hang out and discover some new hobbies, that you can not simply
                    refuse to try. The local population engage in so many different activities, most
                    of the times financed by the state, and organise so many events, that you would
                    need a lifetime, just to live them all.
                  </p>
                  <p className="main-desc">
                    First of all: sports. As you might simply observe from the streets, Dutch people
                    love to do some sports, especially outdoor activities. Because it is so green
                    outside, even in the bus Amsterdam, I have always seen crowds of people ignoring
                    the fancy gyms and go outside in some parks, just to breath in some fresh air
                    and do some sports. I think that, every time I go outside, I always spot
                    someone, always, just jogging in the park, or biking around with their friends.
                    There are also many people who decide to create some groups and organize some
                    group sport activities outside.
                  </p>

                  <p className="main-desc mt-3">
                    I have always been a lazy person, whose favourite sport was surfing on the tv
                    channels, so this fact troubled me a lot. I always felt a little too conscious
                    when friends and co workers always invited me out for a volleyball match, a
                    football one or even for some jogging. I know they meant no harm and just wanted
                    to include me, but I always felt a little too judged. After a while, I decided
                    to cave in and participate in some outdoor sporty activities with my friends,
                    even though it was outside my comfort zone. Despite all, I really enjoyed myself
                    and started even getting a little bit addicted to sports. I know, it was a big
                    shock to me too. But seeing my Dutch friends taking it so serious made me
                    understand how it seriously could shift my life and make me feel better,
                    physically and mentally.
                  </p>
                  <p className="main-desc">
                    But it does not stop here, when it comes to free time in the Netherlands. There
                    are still countless of options and opportunities to follow, ready for you to be
                    discovered. For example, a big favourite of mine are music events and
                    activities. In the cities, especially in Amsterdam, there are countless music
                    schools where you can learn some instruments or even clubs and cafès, for some
                    live concerts. Every day you can encounter some new and unexperienced bands,
                    with a great sound. During the years, you can also attend many music festivals,
                    where you can hang out with your friends and create great memories together and
                    dance until you drop on the ground. Most of all, Amsterdam is known for its
                    various and eclectic music background. The city is one of the most known
                    ‘shangri-la’ for EDM and electronic music, because of its picturesque nightlife.
                    It is certainly
                  </p>
                </div>

                <Reaction
                  reaction={reaction}
                  onReact={(value) => setReaction(value)}
                  classNames="mt-5"
                  likeIconClassNames="mx-2"
                  dislikeIconClassNames="mx-2"
                />

                <div className="add-comment button-hover" onClick={onShow}>
                  <img
                    data-type="like"
                    src="/images/icon/icon-comment-white.svg"
                    className="icon-like"
                    alt="item icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 sidebar">
              <div className="search-bar">
                <img src="/images/icon/icon-search-primary.svg" alt="icon-search" />
                <input type="text" placeholder="Search" />
              </div>

              <div className="recent-blogs">
                <p className="main-subtitle text-left">RECENT BLOGS</p>

                <div className="list">
                  {recentBlogs.map((blog) => (
                    <div className="item main-box">
                      <div className="image" />

                      <div className="content">
                        <div className="date">
                          <span className="font-weight-bold">{blog.day}</span> {blog.month}
                          <span className="year">{blog.year}</span>
                        </div>
                        <span className="main-desc title">{blog.description}</span>
                      </div>

                      <button type="button" className="button">
                        <img src="/images/icon/icon-caret-right-white.svg" alt="right arrow" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="archives">
                <p className="main-subtitle text-left">ARCHIVES</p>

                <div className="list main-box">
                  {archives.map((archive) => (
                    <div className="item">
                      <button type="button" className="button white">
                        <img src="/images/icon/icon-arrow-right.svg" alt="icon" />
                      </button>

                      <div className="content">
                        <span className="date main-desc">{archive.date}</span>
                        <span className="number main-desc text-primary">{archive.number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>

      <Modal show={blogModalVisible} onHide={onClose} id="comment-modal" centered>
        <Modal.Body>
          <div className="modal-background" />
          <button type="button" className="button-nav primary s-40" onClick={onClose}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content">
            <div className="rounded-icon mx-auto">
              <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
            </div>

            <span className="main-title mt-4 d-block font-weight-bold text-center">
              ADD YOUR COMMENT
            </span>
            <span className="main-description font-weight-light mt-1 d-block text-center text-primary">
              Please fill in the form
            </span>

            <div className="form-fields mx-auto mt-5 px-4">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="field-group">
                    <div className="field-icon">
                      <img src="/images/icon/icon-text-primary.svg" alt="item icon" />
                    </div>
                    <span className="field-divider" />
                    <input type="text" placeholder="Name" required />
                  </div>
                </div>

                <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                  <div className="field-group">
                    <div className="field-icon">
                      <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
                    </div>
                    <span className="field-divider" />
                    <input type="email" placeholder="Email Address" required />
                  </div>
                </div>
              </div>

              <div className="field-group mt-3 mt-sm-4">
                <div className="field-icon">
                  <img src="/images/icon/icon-left-align-primary.svg" alt="item icon" />
                </div>
                <span className="field-divider long" />
                <textarea placeholder="Message" required />
              </div>

              <button type="button" className="button d-block mt-4 mx-auto">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
